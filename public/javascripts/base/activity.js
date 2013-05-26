define(['jquery', 'asyncStorage'],
  function($, asyncStorage) {
  'use strict';

  var RK_URL = 'https://api.runkeeper.com';
  var MAX_TIME = 3600; // 1 hour limit for hitting Runkeeper's server

  var Activity = function () {
    this.activityIds = [];
    this.activities = [];

    var self = this;

    /**
     * Assuming that onl walking and hiking are moderate activities and count by the minute.
     * All other activities are counted as 2 minutes of exercise per minute.
     */
    var totalMinutes = function (self, data) {
      var minutes = 0;
      for (var i = 0; i < data.length; i ++) {
        var startTime = Date.parse(data[i].startTime || data[i].start_time) / 1000;
        var day = (self.currentTime - startTime) / 60 / 60 / 24;

        if (day < 8.0) {
          switch (data[i].type.toLowerCase()) {
            case 'hiking':
            case 'walking':
              minutes += Math.round(data[i].duration / 60);
              break;
            default:
              minutes += Math.round(data[i].duration / 60) * 2;
              break;
          }
        }
      }

      return minutes;
    };

    var loadCachedActivities = function (self, callback) {
      console.log('loading cached')
      asyncStorage.getItem('activityIds', function (data) {
        self.activityIds = data;

        for (var i = 0; i < self.activityIds.length; i ++) {
          asyncStorage.getItem('activity:' + self.activityIds[i], function (activity) {
            self.activities.push(activity);

            if (self.activities.length === self.activityIds.length) {
              callback(null, {
                minutes: totalMinutes(self, self.activities),
                activities: self.activities
              });
            }
          });
        }
      });
    };

    var getOnlineActivities = function (accessToken, callback) {
      $.ajax({
        url: RK_URL + '/fitnessActivities',
        method: 'GET',
        headers: {
          'Accept': 'application/vnd.com.runkeeper.FitnessActivityFeed+json',
          'Authorization': 'Bearer ' + accessToken
        },
        dataType: 'json'
      }).done(function (data) {
        callback(null, data.items);
      }).fail(function (err) {
        callback(err);
      });
    };

    var cacheActivities = function (self, data) {
      for (var i = 0; i < data.length; i ++) {
        var id = parseInt(data[i].uri.split('/')[2], 10);

        if (self.activityIds.indexOf(id) < 0) {
          self.activityIds.push(id);
        }

        asyncStorage.setItem('activityIds', self.activityIds);
        asyncStorage.setItem('activity:' + id, {
          id: id,
          duration: data[i].duration,
          startTime: data[i].start_time,
          totalDistance: data[i].total_distance,
          type: data[i].type
        });
      }
    };

    /**
     * Get all recent activities
     * If we've retrieved activities in the past hour or we are offline, load the cached
     * activities from indexedDb.
     */
    this.getAll = function (callback) {
      var self = this;
      this.currentTime = Math.round(new Date() / 1000);

      asyncStorage.getItem('lastChecked', function (lastTime) {
        if (!lastTime || self.currentTime - lastTime >= MAX_TIME) {
          asyncStorage.setItem('lastChecked', self.currentTime);
          getOnlineActivities(self.accessToken, function (err, data) {
            if (err) {
              callback(err);
            } else {
              cacheActivities(self, data);
              callback(null, {
                minutes: totalMinutes(self, data),
                activities: data
              });
            }
          });
        } else {
          loadCachedActivities(self, callback);
        }
      });
    }
  };

  return Activity;
});

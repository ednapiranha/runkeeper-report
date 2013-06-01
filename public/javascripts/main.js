define(['jquery', 'utils', 'settings', 'base/activity', 'nunjucks', 'templates'],
  function($, utils, settings, Activity, nunjucks) {
  'use strict';

  var DEBUG = settings.DEBUG;

  var body = $('body');

  if (DEBUG || !nunjucks.env) {
    // If not precompiled, create an environment with an HTTP loader
    nunjucks.env = new nunjucks.Environment(new nunjucks.HttpLoader('/templates'));
  }

  var activity = new Activity();

  // Get access token for Runkeeper and all past data
  $.getJSON('/get_token', function (data) {
    activity.accessToken = data.token;
    activity.getAll(function (err, data) {
      if (err) {
        console.log(err);
      } else {
        utils.loadTemplate('activities.html', data);
      }
    });
  });

  body.on('click', function (ev) {
    ev.preventDefault();

    var self = $(ev.target);

    if (self.parent().hasClass('activity-link')) {
      self = self.parent();
    }

    switch (self.data('action')) {
      case 'show-activity':
        activity.getDetail(self);
        break;

      default:
        body.find('#detail').addClass('hidden');
        break;
    }
  });
});

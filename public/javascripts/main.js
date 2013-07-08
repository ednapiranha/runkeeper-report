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
    var loading = body.find('.loading');
    activity.accessToken = data.token;
    loading.find('p').text('Loading ...');
    loading.removeClass('hidden');
    activity.getAll(function (err, data) {
      if (err) {
        console.log(err);
      } else {
        loading.addClass('hidden');
        utils.loadTemplate('activities.html', data);
      }
    });
  });

  body.on('click', function (ev) {
    var self = $(ev.target);

    if (self.parent().hasClass('activity-link')) {
      self = self.parent();
    }

    switch (self.data('action')) {
      case 'login':
        body.find('.loading').removeClass('hidden');
        break;

      case 'show-activity':
        ev.preventDefault();
        activity.getDetail(self);
        break;

      case 'logout':
        ev.preventDefault();
        var verifyLogout = confirm('Are you sure you want to sign out?');
        if (verifyLogout) {
          document.location.href = '/logout';
        }
        break;

      case 'close':
        body.find('#detail').addClass('hidden');
        body.find('#map-canvas').empty();
        break;
    }
  });
});

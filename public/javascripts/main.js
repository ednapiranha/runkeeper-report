define(['jquery', 'utils', 'settings', 'base/activity', 'nunjucks', 'templates'],
  function($, utils, settings, Activity, nunjucks) {
  'use strict';

  var DEBUG = settings.DEBUG;

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
});

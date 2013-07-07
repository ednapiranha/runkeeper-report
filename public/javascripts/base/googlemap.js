'use strict';

define(['jquery'],
  function($) {

  var line;

  var self = {
    drawMap: function(pointItems) {
      var mapDiv = document.getElementById('map-canvas');
      var center = Math.floor(pointItems.length / 2);
      console.logot
      var map = new google.maps.Map(mapDiv, {
        center: new google.maps.LatLng(pointItems[0].latitude,
                                       pointItems[center].longitude),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      var path = [];

      for (var i = 0; i < pointItems.length; i ++) {
        path.push(new google.maps.LatLng(pointItems[i].latitude,
                                         pointItems[i].longitude));
      }

      line = new google.maps.Polyline({
        path: path,
        strokeColor: '#f01347',
        strokeOpacity: 0.9,
        strokeWeight: 3
      });

      line.setMap(map);
    }
  };

  return self;
});

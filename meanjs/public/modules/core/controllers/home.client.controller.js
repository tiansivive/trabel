'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', function($scope, Authentication){


  $scope.authentication = Authentication;
  $scope.map = {
    center: {
      latitude: 45,
      longitude: -73
    },
    zoom: 8
  };

  var onSuccess = function(position) {
    $scope.map.center = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    };
    $scope.$apply();
  };
  function onError(error) {
    console.log('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
  }
  navigator.geolocation.getCurrentPosition(onSuccess, onError);

}]);


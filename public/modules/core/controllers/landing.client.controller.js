'use strict';

angular.module('core').controller('LandingController', ['$scope',
	function($scope) {
		
    $scope.map = {
      center: {
          latitude: 45,
          longitude: -73
      },
      zoom: 8
    };
		
	}
]);


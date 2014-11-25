'use strict';

angular.module('trips').controller('TripSearchResultsController', ['$scope', 'TripSearchResults',
	function($scope, TripSearchResults) {
		
    $scope.trips = TripSearchResults.getTrips();

    $scope.results = TripSearchResults;
    $scope.$watch('results.getTrips()', function(newValue) {
        $scope.trips = newValue;
        console.log('changed');
    }, true);
	}
]);
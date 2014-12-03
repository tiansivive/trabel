'use strict';

angular.module('trips').controller('TripSearchResultsController', ['$scope', 'TripSearchResults',
	function($scope, TripSearchResults) {
		
	$scope.trips = [];
	$scope.users = [];
	$scope.arrangeResults = function() {
		var results = TripSearchResults.getTrips();
		
		for (var key in results) {
			var result = results[key];
			
			if (result.name)
				$scope.trips.push(result);
			else if (result.displayName)
				$scope.users.push(result);
		}		
	}
		
   $scope.results = TripSearchResults;
    $scope.$watch('results.getTrips()', function(newValue) {
		$scope.trips = [];
		$scope.users = [];
        $scope.arrangeResults();
        console.log('changed');
    }, true);
	}
]);
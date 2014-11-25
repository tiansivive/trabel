'use strict';

angular.module('trips').factory('TripSearchResults', [
	function() {

		var trips;
		
		// Public API
		return {
			getTrips: function() {
				return trips;
			},
			setTrips: function(data){
				trips = data;
			}
		};
	}
]);
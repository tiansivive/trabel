'use strict';

// Trips controller
angular.module('trips').controller('TripsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Trips', 'GoogleMapApi'.ns(),
	function($scope, $stateParams, $location, Authentication, Trips, GoogleMapApi) {
		$scope.authentication = Authentication;

		// Create new Trip
		$scope.create = function() {
			// Create new Trip object
			var trip = new Trips ({
				name: this.name
			});

			// Redirect after save
			trip.$save(function(response) {
				$location.path('trips/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Trip
		$scope.remove = function( trip ) {
			if ( trip ) { trip.$remove();

				for (var i in $scope.trips ) {
					if ($scope.trips [i] === trip ) {
						$scope.trips.splice(i, 1);
					}
				}
			} else {
				$scope.trip.$remove(function() {
					$location.path('trips');
				});
			}
		};

		// Update existing Trip
		$scope.update = function() {
			var trip = $scope.trip ;

			trip.$update(function() {
				$location.path('trips/' + trip._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Trips
		$scope.find = function() {
			$scope.trips = Trips.query();
		};

		// Find existing Trip
		$scope.findOne = function() {
			$scope.trip = Trips.get({
				tripId: $stateParams.tripId
			});
		};

		$scope.map = {
			//TODO: Center map on trip markers
			center: {
				latitude: 45,
				longitude: -73
			},
			zoom: 8,
			events: {
				/*center_changed: function(maps, eventName, args){
					console.log('ALOOO');
				}*/
			}
		};

		$scope.searchbox = {
			template:'searchbox.tpl.html',
			position:'top-left',
			events:
				{
					places_changed: function(box, eventName, args){
						var place = box.getPlaces()[0];
						var marker = {
							id: $scope.trip.markers.length,
							latitude:place.geometry.location.lat(),
							longitude: place.geometry.location.lng()
						};
						//TODO: zoom level
						$scope.map.center = {
							latitude: place.geometry.location.lat(),
							longitude: place.geometry.location.lng()
						};
						$scope.map.zoom = 10;
						//TODO: save in different collection
						//TODO: dont allow duplicates
						$scope.trip.markers.push(marker);
						$scope.trip.$update();
						//$scope.map.zoom = place.geometry.viewport

					}
				}
			};
	}
]);

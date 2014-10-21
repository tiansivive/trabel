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
				latitude: 20,
				longitude: 0
			},
			zoom: 2,
			events: {
				/*center_changed: function(maps, eventName, args){
					console.log('ALOOO');
				}*/
			},
			object: {}
		};

		$scope.searchbox = {
			template:'searchbox.tpl.html',
			position:'top-left',
			events:
				{
					places_changed: function(box, eventName, args){
						var map = $scope.map.object.getGMap();
						var place = box.getPlaces()[0];
						var id = 0;
						if($scope.trip.markers.length>0)
							id = $scope.trip.markers[$scope.trip.markers.length-1].id+1;
						var marker = {
							id: id,
							place_name: place.name,
							place_id: place.place_id,
							location: {
								latitude: place.geometry.location.lat(),
								longitude: place.geometry.location.lng()
							}
						};

						if(place.geometry.viewport)
						{
							marker.viewport = place.geometry.viewport;
							map.fitBounds(place.geometry.viewport);
						}
						else {
							map.setCenter(place.geometry.location);
							map.setZoom(17);
						}
						//TODO: save in different collection
						//TODO: dont allow duplicates
						var exists = false;
						$scope.trip.markers.forEach(function(marker) {
							if(marker.place_id === place.place_id)
								exists = true;
						});
						if(!exists) {
							$scope.trip.markers.push(marker);
							$scope.trip.$update();
						}
						//$scope.map.zoom = place.geometry.viewport

					}
				}
			};

		$scope.togglePrivacy = function() {
			$scope.trip.privacy = $scope.trip.privacy?0:1;
			$scope.trip.$update();
		};

		GoogleMapApi.then(function(maps) {

			//TODO: complete this
			/*var bounds = new maps.LatLngBounds();

			$scope.trip.markers.forEach(function(marker)
			{
				bounds.extend(new maps.LatLng(marker.location.latitude, marker.location.longitude));
				var map = $scope.map.object.getGMap();
				map.fitBounds(bounds);
			});*/

			$scope.centerMap = function(index) {
				var map = $scope.map.object.getGMap();
				var marker = $scope.trip.markers[index];
				//TODO: fix this stupid bug
				//if(marker.viewport)
				//{
					//map.fitBounds(marker.viewport);
				//}
				//else {
				map.setCenter(new maps.LatLng(marker.location.latitude, marker.location.longitude));
				map.setZoom(17);
				//}
			};

			$scope.deleteMarker = function(index) {
				$scope.trip.markers.splice(index, 1);
				$scope.trip.$update();
			};
		});
	}
]);

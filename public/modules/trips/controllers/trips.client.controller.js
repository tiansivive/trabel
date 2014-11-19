'use strict';

// Trips controller
angular.module('trips').controller('TripsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Trips', 'uiGmapGoogleMapApi', 'ngDialog', '$http',
	function($scope, $stateParams, $location, Authentication, Trips, gmap, ngDialog, $http) {
		$scope.authentication = Authentication;

		$scope.map = {
			//TODO: Center map on trip markers
			center: {
				latitude: 20,
				longitude: 0
			},
			zoom: 2,
			events: {
				/*click: function(maps, eventName, args){
					console.log('CLICKED ON:', args[0].latLng);
				},
				center_changed: function(maps, eventName, args){
					console.log('ALOOO');
				}*/
			},
			object: {}
		};

		$scope.searchbox = {
			template:'searchbox.tpl.html',
			position:'top-left',
			events: {}
		};




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
			},function(data) { //this runs after trip is loaded
				$scope.init();
			});
		};



		$scope.AddMate = function () {
      var dialog = ngDialog.open({
        	template: '/modules/trips/views/dialogs/add-mate-dialog.client.view.html',
        	controller: 'AddMateController',
        	scope: $scope,
        	className: 'ngdialog-theme-plain'
      });

      dialog.closePromise.then(function (data) {
			  console.log(data.id + ' has been dismissed.');
			  console.log(data.value);
			  $scope.trip = data.value;
			});
    };

    $scope.leaveTrip = function(){

    	var url = '/trips/' + $scope.trip._id + '/leave';
    	$http.put(url, '')
           .success(function(data, status, headers, config){
           		console.log('SUCCESS on PUT leaveTrip');
           		console.log(data);
              $location.path('trips');
           })
           .error(function(data, status, headers, config){
              console.error('ERROR on PUT leaveTrip');
              console.log(data);
           });
		};

		$scope.requestToJoin = function(){

    	var url = '/trips/' + $scope.trip._id + '/request/join';
    	$http.post(url, '')
           .success(function(data, status, headers, config){
           		console.log('SUCCESS on POST requestToJoin');
           		console.log(data);
              $location.path('trips');
           })
           .error(function(data, status, headers, config){
              console.error('ERROR on POST requestToJoin');
              console.log(data);
           });

		};


		gmap.then(function(maps) {

			$scope.searchbox.events.places_changed = function(box, eventName, args){
				var map = $scope.map.object.getGMap();
				var place = box.getPlaces()[0];
				var marker = {
					place_name: place.name,
					place_id: place.place_id,
					location: {
						latitude: place.geometry.location.lat(),
						longitude: place.geometry.location.lng()
					}
				};
				//TODO: save in different collection
				//TODO: dont allow duplicates
				var exists = false;
				$scope.trip.markers.forEach(function(marker) {
					if(marker.place_id === place.place_id)
						exists = true;
				});
				if(!exists) {
					if(place.geometry.viewport)
					{
						marker.viewport = place.geometry.viewport;
						$scope.bounds.union(place.geometry.viewport);
					}
					else
						$scope.bounds.extend(place.geometry.location);
					$scope.lineCoords.push(place.geometry.location);
					$scope.path.setPath($scope.lineCoords);
					var index = $scope.trip.markers.push(marker)-1; //returns lenght
					$scope.centerMap(index);
					$scope.updateTrip();
				}
			};

			$scope.centerMap = function(index) {
				var map = $scope.map.object.getGMap();
				var marker = $scope.trip.markers[index];
				if(marker.viewport)
				{
					map.fitBounds(makeViewport(marker.viewport));
				}
				else {
					map.setCenter(
						{
							lat:marker.location.latitude,
							lng:marker.location.longitude
						});
					map.setZoom(17);
				}
			};

			$scope.deleteMarker = function(index) {
				$scope.trip.markers.splice(index, 1);
				$scope.init(); //need to re-init (bounds cant be "un-extended")
				//TODO: optimizar (lento a mandar)
				$scope.updateTrip();
			};

			$scope.updateTrip = function() {
				$scope.isLoading = true;
				$scope.sortableOptions.disabled = true;
				$scope.trip.$update().then(function (response) {
					$scope.isLoading = false;
					$scope.sortableOptions.disabled = false;
				});
			};

			$scope.sortableOptions = {
				start: function(e, ui) {
					ui.item.i = ui.item.index();
				},
				stop: function(e, ui) {
					//update positions in lineCoords array
					if(ui.item.index()!==ui.item.i) {
						$scope.lineCoords.splice(ui.item.index(), 0, $scope.lineCoords.splice(ui.item.i, 1)[0]);
						$scope.path.setPath($scope.lineCoords);
						$scope.updateTrip();
					}
				}
			};

			$scope.path = new maps.Polyline({
				geodesic: true,
				strokeColor: 'blue',
				strokeWeight: 5,
				strokeOpacity: 0.5
			});

			function makeViewport(obj) {
				return new maps.LatLngBounds(
					new maps.LatLng(
						obj.Ea.k,
						obj.va.j
					),
					new maps.LatLng(
						obj.Ea.j,
						obj.va.k
					));
			}

			$scope.disqus = {
				tripID: $stateParams.tripId,
				url: $location.absUrl()
			};

			$scope.init = function() {
				var map = $scope.map.object.getGMap();
				$scope.bounds = new maps.LatLngBounds();
				$scope.lineCoords = [];
				for (var i=0; i<$scope.trip.markers.length; i++) {
					var marker = $scope.trip.markers[i];
					var latlng = new maps.LatLng(
						marker.location.latitude,
						marker.location.longitude
					);
					$scope.lineCoords.push(latlng);
					if(marker.viewport)
						$scope.bounds.union(makeViewport(marker.viewport));
					else
						$scope.bounds.extend(latlng);
				}
				$scope.path.setPath($scope.lineCoords);
				$scope.path.setMap(map);
				map.fitBounds($scope.bounds);
			};

			$scope.resetMap = function() {
				var map = $scope.map.object.getGMap();
				map.fitBounds($scope.bounds);
			};

			$scope.togglePrivacy = function() {
				$scope.trip.privacy = $scope.trip.privacy?0:1;
				//TODO: optimize this, only pass field
				$scope.updateTrip();
			};

			//TODO security issues?
			$scope.hasPermission = function(){
				var permission = false;

				if($scope.authentication.user._id === $scope.trip.user._id){
					permission = true;
				}else{
					$scope.trip.members.forEach(function(member){
						if(member.user._id === $scope.authentication.user._id || member.user.permission === 'write'){
							permission = true;
						}
					});
				}

				return permission;
			};

			$scope.isTripMember = function(){
				var isMember = false;
				$scope.trip.members.forEach(function(member){
					if(member.user._id === $scope.authentication.user._id){
						isMember = true;
					}
				});
				return isMember;
			};
		});
	}
]);

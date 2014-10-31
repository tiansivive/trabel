'use strict';

angular.module('trips').controller('AddMateController', ['$scope', 'Users', '$http', 'Trips',
	function($scope, Users, $http, Trips) {
		
    $scope.users = [];
    $scope.show_item = false;
 
    //TODO make it more efficient than loading all users.
    $http.get('/users/list')
         .success(function(data, status, headers, config){
            $scope.users = data;
         })
         .error(function(data, status, headers, config){
            console.error('ERROR on GET /users/list');
         });

    $scope.$watch('searchInput', function(newValue, oldValue) {
      if(newValue !== undefined){
        if(newValue.length > 2){
          $scope.show_item = true;
        }else{
          $scope.show_item = false;
        } 
      }
    });


    $scope.addMate = function(id){
     
        var tripID = $scope.trip._id;
        var url = '/trips/' + tripID + '/add/mate/' + id;

        /*var req = {
          user_id: id,
          trip_id: tripID
        };*/

      $http.put(url, '')
        .success(function(data, status, headers, config){
            console.log(data);
        })
        .error(function(data, status, headers, config){
            console.error('ERROR on POST /trips/member');
        });
    };



    
}]);
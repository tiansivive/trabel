'use strict';

angular.module('trips').controller('AddMateController', ['$scope', 'Users', '$http', 'Trips',
	function($scope, Users, $http, Trips) {
		
    $scope.users = [];
    $scope.show_item = false;
  
    
    //TODO make it more efficient than loading all users.
    function sendRequest(str){
      console.log('Sending request');


      var requestData = {
        pattern: str,
        members: $scope.trip.members
      };
      $http.post('/users/list', requestData)
           .success(function(data, status, headers, config){      
              $scope.users = data;
           })
           .error(function(data, status, headers, config){
              console.error('ERROR on POST /users/list');
              console.log(data);
           });
    }

    $scope.$watch('searchInput', function(newValue, oldValue) {
      if(newValue !== undefined){
        if(newValue.length > 2 && oldValue.length <= 2){
          sendRequest(newValue);
        }
      }
    });


    $scope.addMate = function(id){

      var tripID = $scope.trip._id;
      var url = '/trips/' + tripID + '/invite/mate/' + id;
      
      $http.post(url, '')
        .success(function(data, status, headers, config){
          console.log('SUCCESS');
          console.log(data);
        })
        .error(function(data, status, headers, config){
          console.log('ERROR');
          console.log(data);
        });
     /*
      var tripID = $scope.trip._id;
      var url = '/trips/' + tripID + '/add/mate/' + id;

      $http.put(url, '')
        .success(function(data, status, headers, config){
            console.log('SUCCESS on PUT /trips/:tripID/add/mate/:userID');
            console.log(data);
            $scope.trip = data;
            var index = 0;
            $scope.users.forEach(function(user){
              if(user._id === id){
                index = $scope.users.indexOf(user);
              }  
            });
            $scope.users.splice(index, 1);
           
        })
        .error(function(data, status, headers, config){
            console.error('ERROR on PUT /trips/:tripID/add/mate/:userID');
        });
      */
    };



    
}]);
'use strict';

angular.module('trips').controller('AddMateController', ['$scope', 'Users', '$http',
	function($scope, Users, $http) {
		
    var users = $http.get('/users/names')
                      .success(function(data, status, headers, config){
              
                      })
                      .error(function(data, status, headers, config){
                   
                      });

    console.log(users);

 
    $scope.$watch('searchInput', function(newVal, oldVal){

      if(newVal !== oldVal){
        searchUsers(newVal);
      }
    });


    function searchUsers(str){
      console.log('changed');
    }

	}
]);
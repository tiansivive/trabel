'use strict';

angular.module('trips').controller('AddMateController', ['$scope', 'Users', '$http',
	function($scope, Users, $http) {
		
    $scope.users = [];
 
    //TODO make it more efficient than loading all users. Maybe wait for a number of characters have been written

    $http.get('/users/all2')
         .success(function(data, status, headers, config){
            $scope.users = data;
         })
         .error(function(data, status, headers, config){
                   
         });

    
}]);
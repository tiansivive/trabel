'use strict';

angular.module('users').controller('InboxController', ['$scope', 'Authentication', '$http',
	function($scope, Authentication, $http) {
		
    $scope.authentication = Authentication;
    $scope.find = function(){

      $http.get('/user/messages')
          .success(function(data, status, headers, config){ 
            console.log('SUCESS');
            console.log(data);
            $scope.messages_received = data.messages_received;
            $scope.messages_sent = data.messages_sent;

            console.log($scope.messages_received);
          })
          .error(function(data, status, headers, config){
            console.log('ERROR');
            console.log(data);
          });
      
    };
	}
]);
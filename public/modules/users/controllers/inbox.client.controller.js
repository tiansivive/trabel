'use strict';

angular.module('users').controller('InboxController', ['$scope', 'Authentication', '$http', '$location',
	function($scope, Authentication, $http, $location) {
		
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

	$scope.reply = function (userID) {
		var path = '/message/new/' + userID;
  		$location.path(path);
	};

	$scope.delete = function (msgID) {
		var path = '/user/message/delete/' + msgID;
	
		$http.put(path, "")
			.success(function(data, status, headers, config){ 
			console.log('SUCCESS');
			console.log(data);
			$scope.messages_received = data.messages_received;
			})
			.error(function(data, status, headers, config){
            console.log('ERROR');
            console.log(data);
        });
	};
}]);
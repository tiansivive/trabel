'use strict';

angular.module('users').controller('InboxController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		
    $scope.authentication = Authentication;
    $scope.find = function(){
      $scope.messages = $scope.authentication.user.messages_received;
    };



	}
]);
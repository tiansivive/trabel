'use strict';

angular.module('users').controller('SendMessageController', ['$scope', '$http', '$stateParams',
	function($scope, $http, $stateParams) {
		

    $scope.findOne = function(){
      $http.get('/users/' + $stateParams.userID)
          .success(function(data, status, headers, config){ 
            console.log('SUCESS');
            console.log(data);
            $scope.receiver = data;
          })
          .error(function(data, status, headers, config){
              console.log('ERROR');
              console.log(data);
          });
    };


    $scope.sendMessage = function(){

      var requestData = {
        subject: $scope.message.subject,
        content: $scope.message.content
      };

      console.log($stateParams.userID);
      $http.post('/users/send/message/' + $stateParams.userID, requestData)
          .success(function(data, status, headers, config){ 
            console.log('SUCESS');
            console.log(data);
            $scope.receiver = data;
          })
          .error(function(data, status, headers, config){
              console.log('ERROR');
              console.log(data);
          });
    };
	}
]);
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
      $http.put('/users/add/message/received/' + $stateParams.userID, requestData)
          .success(function(data, status, headers, config){ 
            console.log('SUCESS');
            console.log(data);
            $http.put('/users/add/message/sent/' + $stateParams.userID, requestData) //make it more semantic, the ID in the URL is not the sender's, but rather, the receiver's
                .success(function(data, status, headers, config){ 
                  console.log('SUCESS');
                  console.log(data);
                  console.log('Fuck Yeah!');
                  
                })
                .error(function(data, status, headers, config){
                    console.log('ERROR');
                    console.log(data);
            });
          })
          .error(function(data, status, headers, config){
              console.log('ERROR');
              console.log(data);
      });
     
    };
	}
]);
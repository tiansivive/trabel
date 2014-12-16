'use strict';

angular.module('users').controller('ViewProfileController', ['$scope', '$http', '$stateParams',
	function($scope, $http, $stateParams) {

$scope.findUser = function(){
		  $http.get('/users/' + $stateParams.userID)
			  .success(function(data, status, headers, config){
  				console.log('SUCESS');
  				console.log(data);
  				$scope.user = data;

			  	if ($scope.user.picture)
						$scope.picture = $scope.user.picture;
			  	else
						$scope.picture = '/modules/users/img/default-photo.png';

			  })
			  .error(function(data, status, headers, config){
				  console.log('ERROR');
				  console.log(data);
			  });
		};
	}]);

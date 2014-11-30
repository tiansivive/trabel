'use strict';

angular.module('users').controller('ViewProfileController', ['$scope', '$http', '$stateParams', 
	function($scope, $http, $stateParams) {

$scope.findUser = function(){
		  $http.get('/users/' + $stateParams.userID)
			  .success(function(data, status, headers, config){ 
  				console.log('SUCESS');
  				console.log(data);
  				$scope.user = data;
			  	$scope.picture;
			  
			  	var found = 0;
			  	
			  	for(var key in $scope.user.additionalProvidersData){
					var provider = $scope.user.additionalProvidersData[key];
					
					if (provider.picture) {
						$scope.picture = provider.picture;
						found = 1;
						break;
				  }
				}
			  
			  	if (found == 0) {
					$scope.picture = "/modules/users/img/default-photo.png";	
				}
			  })
			  .error(function(data, status, headers, config){
				  console.log('ERROR');
				  console.log(data);
			  });
		}
	}]);
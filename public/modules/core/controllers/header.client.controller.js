'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus', '$http',
	function($scope, Authentication, Menus, $http) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});

		$scope.search = function(){

			console.log('searchInput is ' + $scope.searchInput);

			var requestData = {pattern: $scope.searchInput};

			$http.post('/trips/search', requestData)
           .success(function(data, status, headers, config){      
              console.log('SUCESS on POST /trips/search');
              console.log(data);
           })
           .error(function(data, status, headers, config){
              console.error('ERROR on POST /trips/search');
              console.log(data);
           });
		};


	}
]);
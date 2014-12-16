'use strict';

(function() {
	describe('DashboardController', function() {
		//Initialize global variables
		var scope,
			DashboardController;

		// Load the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		beforeEach(inject(function($controller, $rootScope) {
			scope = $rootScope.$new();

			DashboardController = $controller('DashboardController', {
				$scope: scope
			});
		}));

		it('should expose the authentication service', function() {
			expect(scope.authentication).toBeTruthy();
		});
	});
})();
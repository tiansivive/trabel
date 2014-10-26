'use strict';

angular.module('core').directive('mixitup', [
	function() {
		return {
			restrict: 'A',
			link: function postLink(scope, element, attrs) {
				
				 $(element).mixItUp();
			}
		};
	}
]);
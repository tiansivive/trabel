'use strict';

// Configuring the Articles module
angular.module('trips').config(['uiGmapGoogleMapApiProvider',
function (GoogleMapApi) {
				GoogleMapApi.configure({
						key: 'AIzaSyDmTgQBcjGfj9ZnlBFTjdFm6fcWREcIPbc',
						v: '3.17',
						libraries: 'weather,geometry,visualization,places'
					});
			}]).run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Trips', 'trips', 'dropdown', '/trips(/create)?');
		Menus.addSubMenuItem('topbar', 'trips', 'List Trips', 'trips');
		Menus.addSubMenuItem('topbar', 'trips', 'New Trip', 'trips/create');
	}
]);

'use strict';

module.exports = {
	app: {
		title: 'MEAN',
		description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
		keywords: 'MongoDB, Express, AngularJS, Node.js'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
				'public/lib/famous-angular/dist/famous-angular.css'
			],
			js: [
				'public/lib/lodash/dist/lodash.underscore.js',
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/famous/famous-global.js',
				'public/lib/famous-angular/dist/famous-angular.js',
				'public/lib/bluebird/js/browser/bluebird.js',
				'public/lib/angular-google-maps/dist/angular-google-maps.min.js',
				'public/lib/jquery/dist/jquery.min.js'
				//'public/lib/angular-foundation/mm-foundation-tpls-VERSION.js',


			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js',
			'public/scripts/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};

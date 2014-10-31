'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var trips = require('../../app/controllers/trips');

	// Trips Routes
	app.route('/trips')
		.get(trips.list)
		.post(users.requiresLogin, trips.create);

	app.route('/trips/:tripId')
		.get(trips.read)
		.put(users.requiresLogin, trips.hasAuthorization, trips.update)
		.delete(users.requiresLogin, trips.hasAuthorization, trips.delete);

	app.route('/trips/:tripId/add/mate/:userId')
		.put(users.requiresLogin, trips.hasAuthorization, trips.update);
	// Finish by binding the Trip middleware
	app.param('userId', trips.addMember);
	app.param('tripId', trips.tripByID);

};
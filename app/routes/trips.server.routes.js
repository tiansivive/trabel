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

	app.route('/trips/:tripId/leave')
		.put(users.requiresLogin, trips.hasAuthorization, trips.removeMate, trips.update);
	app.route('/trips/:tripId/request/join')
		.post(users.requiresLogin, trips.requestJoin);
	app.route('/trips/:tripId/invite/mate/:userId')
		.post(users.requiresLogin, trips.hasAuthorization, trips.inviteMate);

	app.route('/trips/:tripId/decline/invitation/:userId')
		.get(trips.declineInvitation); //Maybe not GET but PUT? rething when implementing declineInvitation
	app.route('/trips/:tripId/add/mate/:userId')
		.get(trips.addTripMate); //maybe change from GET later once we have notifications and inboxes
	// Finish by binding the Trip middleware
	app.param('userId', trips.userByID);
	app.param('tripId', trips.tripByID);

};



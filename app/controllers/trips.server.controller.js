'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Trip = mongoose.model('Trip'),
	User = mongoose.model('User'),
	_ = require('lodash');

/**
 * Create a Trip
 */
exports.create = function(req, res) {
	var trip = new Trip(req.body);
	trip.user = req.user;
	console.log(req);

	console.log(trip);

	trip.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(trip);
		}
	});
};

/**
 * Show the current Trip
 */
exports.read = function(req, res) {
	res.jsonp(req.trip);
};

/**
 * Update a Trip
 */
exports.update = function(req, res) {
	console.log('STEP 5');
	var trip = req.trip ;

	trip = _.extend(trip , req.body);

	trip.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(trip);
		}
	});
};

/**
 * Delete an Trip
 */
exports.delete = function(req, res) {
	var trip = req.trip ;

	trip.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(trip);
		}
	});
};

/**
 * List of Trips
 */
exports.list = function(req, res) {
	Trip.find({$or:
		[
			{'user': req.user._id},
			{'privacy': 1}
		]}).sort('-created').populate('user', 'displayName').exec(function(err, trips) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.jsonp(trips);
			}
		});
};


/**
 * Trip middleware
 */
exports.tripByID = function(req, res, next, id) { 
	
	console.log('STEP 1');
	Trip.findById(id).populate('user members.user', 'displayName email').exec(function(err, trip) {
		if (err) return next(err);
		if (! trip) return next(new Error('Failed to load Trip ' + id));
		console.log('populating displayName and email');

		req.trip = trip;
		next();
	});
};

exports.addMember = function(req, res, next, id) { 
	console.log('STEP 2');

	var member = {
		user: id,
		permission: 'write'
	};
	req.trip.members.push(member);

	console.log(req.trip);
	next();
};

/**
 * Trip authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	console.log('STEP 4');
	if (req.trip.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};


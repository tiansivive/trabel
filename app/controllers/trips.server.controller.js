'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Trip = mongoose.model('Trip'),
	User = mongoose.model('User'),
	_ = require('lodash'),
	config = require('../../config/config'),
	nodemailer = require('nodemailer'),
	crypto = require('crypto'),
	async = require('async');



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
	console.log('STEP - update');
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
			{'privacy': 1},
			{'members.user': req.user._id} 
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
 *	Invite a mate for the trip
 */
exports.inviteMate = function(req, res){

		//once Notification system is up, notify user as well
		console.log('inviteMate');
		console.log(req);
		async.waterfall([

			function(done) {
				res.render('templates/invite-mate', {
					appName: config.app.title,
					invitedUser: req.resolvedUser.displayName,
					tripOwner: req.user.displayName,
					tripName: req.trip.name,
					acceptURL: 'http://' + req.headers.host + '/trips/' + req.trip._id + '/add/mate/' + req.resolvedUser._id,
					declineURL: 'http://' + req.headers.host + '/trips/' + req.trip._id + '/decline/invitation/' + req.resolvedUser._id
				}, function(err, emailHTML) {
					done(err, emailHTML);
				});
			},
			function(emailHTML, done) {
				var smtpTransport = nodemailer.createTransport(config.mailer.options);
				var mailOptions = {
					to: req.resolvedUser.email,
					from: config.mailer.from,
					subject: 'Trip Invitation',
					html: emailHTML
				};
				smtpTransport.sendMail(mailOptions, function(err) {
					if (!err) {
						res.send({
							message: req.resolvedUser.displayName + ' has been invited to join the trip'
						});
					}
					done(err);
				});
			}
		], function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			}
		});

};


exports.declineInvitation = function(req, res){
	//once Notification system is up, notify user as well

};

/**
 * Trip middleware
 */
exports.tripByID = function(req, res, next, id) { 
	
	console.log('STEP - tripByID');
	Trip.findById(id).populate('user members.user', 'displayName').exec(function(err, trip) {
		if (err) return next(err);
		if (! trip) return next(new Error('Failed to load Trip ' + id));

		req.trip = trip;
		next();
	});
};

exports.userByID = function(req, res, next, id) { 
	console.log('STEP - userByID');

	User.findById(id).exec(function(err, usr){
		req.resolvedUser = usr;
		next();
	});
};

exports.addTripMate = function(req, res){
	
	console.log('STEP - addTripMate');
	var member = {
		user: req.resolvedUser._id,
		permission: 'write'
	};
	req.trip.members.push(member);


	var trip = req.trip ;
	trip = _.extend(trip , req.body);

	trip.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}else{
			res.redirect('/#!/trips/' + trip._id);
		}
	});

	
};

/**
 * Trip authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	console.log('STEP - hasAuthorization');
	if (req.trip.user.id !== req.user._id) {
		var authorized = false;
		console.log(req.trip.members);
		console.log(req.user);
		req.trip.members.forEach(function(member){

			if(member.user._id === req.user._id){
				authorized = true;
			} 
		});

		if(!authorized){ 
			console.log('not authorized');
			return res.status(403).send('User is not authorized');
		}
	}
	next();
	next();
};


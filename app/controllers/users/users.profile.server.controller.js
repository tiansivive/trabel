'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User');

/**
 * Update user details
 */
exports.update = function(req, res) {
	// Init Variables
	var user = req.user;
	var message = null;

	// For security measurement we remove the roles from the req.body object
	delete req.body.roles;

	if (user) {
		// Merge existing user
		user = _.extend(user, req.body);
		user.updated = Date.now();
		user.displayName = user.firstName + ' ' + user.lastName;

		user.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				req.login(user, function(err) {
					if (err) {
						res.status(400).send(err);
					} else {
						res.jsonp(user);
					}
				});
			}
		});
	} else {
		res.status(400).send({
			message: 'User is not signed in'
		});
	}
};

/**
 * Send User
 */
exports.me = function(req, res) {
	res.jsonp(req.user || null);
};

/*
 * Send all user data
 */
exports.list = function(req, res) {
	User.find({}, function(err, users) {

		if(err){
			res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}else{
	    var users_list = [];
	    users.forEach(function(user) {
	      users_list.push(user);
	    });
	    res.send(users_list); 
    } 
  });
};
exports.list_by_name = function(req, res) {
	User.find({}, function(err, users) {

		if(err){
			res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}else{
	    var users_list = {};
	    users.forEach(function(user) {
	    	var info = {
	    		id: user._id,
	    		email: user.email
	    	};
	    	users_list[user.displayName] = info;
	    });
	    res.send(users_list); 
    } 
  });
};
exports.list_by_email = function(req, res) {
	User.find({}, function(err, users) {

		if(err){
			res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}else{
	    var users_list = {};
	    users.forEach(function(user) {
	    	var info = {
	    		id: user._id,
	    		name: user.displayName
	    	};
	    	users_list[user.email] = info;
	    });
	    res.send(users_list); 
    } 
  });
};
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Trip Schema
 */
var TripSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Trip name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	//0-private,1-public
	privacy: {
		type: Number,
		default: 0
	},
	markers: {
		type: Array
	}
});

mongoose.model('Trip', TripSchema);

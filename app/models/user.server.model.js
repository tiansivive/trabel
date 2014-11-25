'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto');

/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function(property) {
	return ((this.provider !== 'local' && !this.updated) || property.length);
};

/**
 * A Validation function for local strategy password
 */
var validateLocalStrategyPassword = function(password) {
	return (this.provider !== 'local' || (password && password.length > 6));
};




/*
 * Notification Schema
 */
var NotificationSchema = new Schema({
});


/*
 * Message Schema
 */
var MessageSchema = new Schema({
	
	subject: {
		type: String,
		trim: true,
		default: 'Unknown' 
	},
	content: {
		type: String,
		trim: true,
		default: ''
	},
	date: {
		type: Date,
		default: Date.now
	},
	receiver: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	sender: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	read: {
		type: Boolean,
		default: false
	}

});


/**
 * User Schema
 */
var UserSchema = new Schema({
	firstName: {
		type: String,
		trim: true,
		default: ''
	},
	lastName: {
		type: String,
		trim: true,
		default: ''
	},
	displayName: {
		type: String,
		trim: true
	},
	phoneNumber: {
		type: String,
		trim: true,
		match: [/^\+(?:[0-9] ?){6,14}[0-9]$/, 'Please fill a valid phone number (with country +xxx prefix)']
	},
	country: {
		type: String,
		trim: true
	},
	city: {
		type: String,
		trim: true
	},
	email: {
		type: String,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Please fill in your email'],
		match: [/.+\@.+\..+/, 'Please fill a valid email address']
	},
	password: {
		type: String,
		default: '',
		validate: [validateLocalStrategyPassword, 'Password should be longer']
	},
	salt: {
		type: String
	},
	provider: {
		type: String,
		required: 'Provider is required'
	},
	providerData: {},
	additionalProvidersData: {},
	roles: {
		type: [{
			type: String,
			enum: ['user', 'admin']
		}],
		default: ['user']
	},
	updated: {
		type: Date
	},
	created: {
		type: Date,
		default: Date.now
	},
	/* For reset password */
	resetPasswordToken: {
		type: String
	},
	resetPasswordExpires: {
		type: Date
	},
	/* Email verification token */
	emailToken: {
		type: String
	},
	verified: {
		type: Boolean
	},

	messages_sent: {
		type: [MessageSchema],
		default: []
	},
	messages_received: {
		type: [MessageSchema],
		default: []
	}

	/*
	notifications:{
		type: NotificationSchema,
		default: undefined
	}
*/

});

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function(next) {
	if (this.password && this.password.length > 6) {
		this.salt = crypto.randomBytes(16).toString('hex');
		this.password = this.hashPassword(this.password);
	}

	next();
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function(password) {
	if (this.salt && password) {
		return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('hex');
	} else {
		return password;
	}
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};


mongoose.model('Notification', NotificationSchema);
mongoose.model('Message', MessageSchema);
mongoose.model('User', UserSchema);

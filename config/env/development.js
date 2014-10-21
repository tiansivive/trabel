'use strict';

module.exports = {
	db: 'mongodb://ldso:sweetlikeacandy@linus.mongohq.com:10040/app30695605',
	app: {
		title: 'Trabel'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || '1544243265791777',
		clientSecret: process.env.FACEBOOK_SECRET || 'dbf587914a274f9c5c41d1cb6c9de9ff',
		callbackURL: 'http://localhost:3000/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
		clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
		callbackURL: 'http://localhost:3000/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || '676627752692-sqguu0ha95o80v2a6vl3vgjq1ggrq6bu.apps.googleusercontent.com',
		clientSecret: process.env.GOOGLE_SECRET || 'avJS40BEt9pg4M61xGAGwsV_',
		callbackURL: 'http://localhost:3000/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'APP_ID',
		clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/github/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'noreply@trabel.heroku.com',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'mailgun',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'postmaster@sandbox9dea6a6f05f04adbbbb76c2cb99642e6.mailgun.org',
				pass: process.env.MAILER_PASSWORD || 'dac0c91dec29492be6e2162a34997eb7'
			}
		}
	}
};

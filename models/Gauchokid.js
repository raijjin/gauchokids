var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Gauchokid Model
 * ==========
 */

var Gauchokid = new keystone.List('Gauchokid');

Gauchokid.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true },
	password: { type: Types.Password, initial: true, required: true }
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true }
});

// Provide access to Keystone
Gauchokid.schema.virtual('canAccessKeystone').get(function() {
	return this.isAdmin;
});


/**
 * Relationships
 */

Gauchokid.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */

Gauchokid.defaultColumns = 'name, email, isAdmin';
Gauchokid.register();

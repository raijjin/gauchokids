var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	// locals
	locals.data = {
		events: []
	};

	// load events
	view.on('init', function(next) {
		keystone.list('Post').model
			.find({
				'publishedDate': {
					'$gte': new Date()
				}

			})
			.limit(5)
			.exec(function(err,results) {
				if (err || !results.length) {
					return next(err); 
				}

				locals.data.events = results;
				return next();
			})
	});

	
	// Render the view
	view.render('index');
	
};

"use strict";

var plugin = {},
	async = module.parent.require('async'),
	topics = module.parent.require('./topics'),
	categories = module.parent.require('./categories'),
	settings = module.parent.require('./settings'),
	socketAdmin = module.parent.require('./socket.io/admin'),
	emitter = module.parent.require('./emitter'),
	defaultSettings = { category_1: '1', category_2: '2', category_3: '3', category_4: '4' };

emitter.on('nodebb:ready', modifyCategoryTpl);

plugin.init = function(params, callback) {
	var app = params.router,
		middleware = params.middleware,
		controllers = params.controllers;

	app.get('/admin/plugins/featured-categories', middleware.admin.buildHeader, renderAdmin);
	app.get('/api/admin/plugins/featured-categories', renderAdmin);

	plugin.settings = new settings('featured-categories', '1.0.0', defaultSettings);

	socketAdmin.settings.syncfeaturedCategories = function () {
		plugin.settings.sync();
	};

	callback();
};

plugin.addAdminNavigation = function(header, callback) {
	header.plugins.push({
		route: '/plugins/featured-categories',
		icon: 'fa-tint',
		name: 'Featured Categories'
	});

	callback(null, header);
};

plugin.getCategories = function(data, callback) {
	var cids = [
		plugin.settings.get('category_1'),
		plugin.settings.get('category_2'),
		plugin.settings.get('category_3'),
		plugin.settings.get('category_4')
	];

	categories.getCategories(cids, data.req.uid, function(err, categoriesData) {
		data.templateData.featuredCategories = categoriesData;

		socketAdmin.featuredCategories = {};
		socketAdmin.featuredCategories.getFeatured = function (socket, the_data, callback) {
			callback(null, {info: {
				category_1: cids[0],
				category_2: cids[1],
				category_3: cids[2],
				category_4: cids[3]
			}});
		}

		callback(err, data);
	});
};

function renderAdmin(req, res, next) {
	res.render('admin/plugins/featured-categories', {});
}

function modifyCategoryTpl(callback) {
	callback = callback || function() {};

	var fs = require('fs'),
		path = require('path'),
		nconf = module.parent.require('nconf'),
		tplPath = path.join(nconf.get('base_dir'), 'public/templates/categories.tpl'),
		headerPath = path.join(nconf.get('base_dir'), 'node_modules/nodebb-plugin-featured-categories/static/templates/partials/nodebb-plugin-featured-categories/header.tpl');

	async.parallel({
		original: function(next) {
			fs.readFile(tplPath, next);
		},
		header: function(next) {
			fs.readFile(headerPath, next);
		}
	}, function(err, tpls) {
		if (err) {
			return callback(err);
		}

		var tpl = tpls.original.toString();

		if (!tpl.match('<!-- Featured Categories plugin -->')) {
			tpl = tpls.header.toString() + tpl;
		}

		fs.writeFile(tplPath, tpl, callback);
	});
}

module.exports = plugin;

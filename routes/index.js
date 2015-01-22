var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){
    
    /* GET home page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('front/index', { message: req.flash('message') });
	});
    
    /* GET meet our team page. */
	router.get('/meet-our-team', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('front/team', { message: req.flash('message') });
	});
    
    /* GET messages page. */
	router.get('/admin/messages', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('admin/messages', { message: req.flash('message') });
	});
    
    /* GET employees page. */
	router.get('/admin/employees', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('admin/employees', { message: req.flash('message') });
	});
    
    /* GET department page. */
	router.get('/admin/departments', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('admin/departments', { message: req.flash('message') });
	});
    
    /* GET support page. */
	router.get('/admin/support', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('admin/support', { message: req.flash('message') });
	});
    
    /* GET support page. */
	router.get('/admin/dashboard', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('admin/dashboard', { message: req.flash('message') });
	});
    
    /* GET settings page. */
	router.get('/admin/settings', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('admin/settings', { message: req.flash('message') });
	});
    
    

	/* GET login page. */
	router.get('/admin/login', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('admin/login', { message: req.flash('message') });
	});

	/* Handle Login POST */
	router.post('/admin/login', passport.authenticate('login', {
		successRedirect: '/admin/dashboard',
		failureRedirect: '/',
		failureFlash : true  
	}));

	/* GET Registration Page */
	router.get('/admin/register', function(req, res){
		res.render('admin/register',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/admin/register', passport.authenticate('signup', {
		successRedirect: '/admin/dashboard',
		failureRedirect: '/admin/register',
		failureFlash : true  
	}));
    
    /* GET settings page. */
	router.get('/admin/forgot-password', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('admin/forgot-password', { message: req.flash('message') });
	});

	/* Handle Logout */
	router.get('/admin/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

    ///////////////////////////////////////////
    
	/* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res){
		res.render('home', { user: req.user });
	});

	return router;
}
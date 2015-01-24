var express = require('express');
var router = express.Router();

var err;

var Employee = require('../models/employee');

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/admin/login');
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
		res.render('admin/messages', { user: req.user });
	});
    
    /* Employees
    ================================================================================*/
    
    var Employee = require('../models/employee');
        
    var GetAllEmployees = function(){
        //Get all employees
        Employee.find(function(err, employees){
            if(err){
                console.log(err);
            }
                console.log('deserializing employees:' + employees);
            return employees;
        });
    };
    
    /* GET employees page. */
	router.get('/admin/employees', function(req, res) {
    	// Display the Login page with any flash message, if any
        var employees = GetAllEmployees();
		res.render('admin/employees', { user: req.user, employees : employees });
	});
    
    /* GET employees list. */
	router.get('/admin/employees.json', function(req, res) {
        Employee
            .find()
            .where({ '_created_by': req.user._id })
            .populate('manager')
            .populate('_created_by')
            .exec(function(err, employees){
                if(err){
                    console.log(err);
                }

                var itemArray = [];

                for(var i = 0; i < employees.length; i++){
                    var objArray = [];
                    objArray.push(employees[i].employee_no);
                    objArray.push(employees[i].initials);
                    objArray.push(employees[i].firstname);
                    objArray.push(employees[i].lastname);
                    objArray.push(employees[i].nationality);
                    objArray.push(employees[i].email);
                    objArray.push(employees[i].cellphone);
                    objArray.push(employees[i].ethnicity);
                    objArray.push(employees[i].position);
                    
                    if(employees[i].manager == null){
                        objArray.push("");
                    }else{
                        objArray.push(employees[i].manager.firstname);
                    }
                    
                    objArray.push(employees[i].cost_centre);
                    objArray.push(employees[i].employee_group_description);
                    objArray.push(employees[i].employee_sub_group_description);
                    
                    if(employees[i]._created_by == null){
                        objArray.push("");
                    }else{
                        objArray.push(employees[i]._created_by.company);
                    }
                    
                    itemArray.push(objArray);
                }
                res.json({ "data" : itemArray });
            });
	});
    
    /* Handle Login POST */
	router.post('/admin/employees', function(req, res) {
        
        var CreateEmployee = function(){
            Employee.create({
                employee_no: req.body.employee_no,
                initials: req.body.initials,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                cellphone: req.body.cellphone,
                _created_by: req.user._id
            }, function(err, employees){
                if(err){
                    this.err = err;
                console.log(err);
                }
                console.log('deserializing employees:' + employees);
                return GetAllEmployees();
            });
        }
        
        var employees = CreateEmployee();
        
    	// Display the Login page with any flash message, if any
		res.render('admin/employees', { user: req.user, employees : employees, err: err });
        
    });
    
    /* GET department page. */
	router.get('/admin/departments', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('admin/departments', { user: req.user });
	});
    
    /* GET support page. */
	router.get('/admin/support', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('admin/support', { user: req.user });
	});
    
    /* GET dashboard page. */
	router.get('/admin/dashboard', isAuthenticated, function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('admin/dashboard', { user: req.user });
	});
    
    /* GET settings page. */
	router.get('/admin/settings', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('admin/settings', { user: req.user });
	});

	/* GET login page. */
	router.get('/admin/login', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('admin/login', { message: req.flash('message') });
	});

	/* Handle Login POST */
	router.post('/admin/login', passport.authenticate('login', {
		successRedirect: '/admin/dashboard',
		failureRedirect: '/admin/login',
		failureFlash : true  
	}));

	/* GET Registration Page */
	router.get('/admin/register', function(req, res){
		res.render('admin/register',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/admin/register', passport.authenticate('register', {
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

	return router;
}
var express = require('express');
var router = express.Router();

var err;

var Employee = require('../models/employee');
var TypeHierarchy = require('../models/type_hierarchy');

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
    
    /* TTYPE_HIERARCHIES
    ================================================================================*/
    
    /* Handle Type Hierarchies */
	router.get('/admin/type_hierarchy', function(req, res) {
        
        var RefreshTypeHierarchy = function(){
            
            TypeHierarchy.find().remove(function(err, result){
                if(err){
                    console.log("Could not remove types");
                }else{
                    
                }
            });
            
            //CREATE COUNTRY Hierarchy
            
            TypeHierarchy.create({
                name: 'COUNTRY',
                description: 'Country'
            }, function(err, result){
                if(err){
                    this.err = err;
                    console.log(err);
                }else{
                    console.log(result);  
                    
                    //CREATE COUNTY CHILDREN

                    TypeHierarchy.create(
                        [
                            { name: 'COUNTRY_SOUTH_AFRICA', description: 'South Africa', parent: result._id, ordinal: '0'},
                            { name: 'COUNTRY_ZIMBABWE', description: 'Zimbabwe', parent: result._id, ordinal: '1'}
                        ],
                        function(err, children){
                            if(err){
                                this.err = err;
                                console.log(err);
                            }else{
                                console.log(children);
                            }
                        }
                    ); 
                    
                }
            });
            
            //CREATE COUNTRY Hierarchy
            
            TypeHierarchy.create({
                name: 'GENDER',
                description: 'Gender'
            }, function(err, result){
                if(err){
                    this.err = err;
                    console.log(err);
                }else{
                    console.log(result);  
                    
                    //CREATE COUNTY CHILDREN

                    TypeHierarchy.create(
                        [
                            { name: 'GENDER_MALE', description: 'Male', parent: result._id, ordinal: '0'},
                            { name: 'GENDER_FEMALE', description: 'Female', parent: result._id, ordinal: '1'},
                            { name: 'GENDER_OTHER', description: 'Other', parent: result._id, ordinal: '2'}
                        ],
                        function(err, children){
                            if(err){
                                this.err = err;
                                console.log(err);
                            }else{
                                console.log(children);
                            }
                        }
                    ); 
                    
                }
            });
            
            //CREATE ETHNICITY Hierarchy
            
            TypeHierarchy.create({
                name: 'ETHNICITY',
                description: 'Ethnicity'
            }, function(err, result){
                if(err){
                    this.err = err;
                    console.log(err);
                }else{
                    console.log(result);  
                    
                    //CREATE COUNTY CHILDREN

                    TypeHierarchy.create(
                        [
                            { name: 'ETHNICITY_AFRICAN', description: 'African', parent: result._id, ordinal: '0'},
                            { name: 'ETHNICITY_COLOURED', description: 'Couloured', parent: result._id, ordinal: '1'},
                            { name: 'ETHNICITY_INDIAN', description: 'Indian', parent: result._id, ordinal: '2'},
                            { name: 'ETHNICITY_WHITE', description: 'White', parent: result._id, ordinal: '3'},
                        ],
                        function(err, children){
                            if(err){
                                this.err = err;
                                console.log(err);
                            }else{
                                console.log(children);
                            }
                        }
                    ); 
                    
                }
            });
            
            //CREATE COST CENTRE Hierarchy
            
            TypeHierarchy.create({
                name: 'COST_CENTRE',
                description: 'Cost Centre'
            }, function(err, result){
                if(err){
                    this.err = err;
                    console.log(err);
                }else{
                    console.log(result);  
                    
                    //CREATE COUNTY CHILDREN

                    TypeHierarchy.create(
                        [
                            { name: 'COST_CENTRE_C090', description: 'C090', parent: result._id, ordinal: '0'},
                        ],
                        function(err, children){
                            if(err){
                                this.err = err;
                                console.log(err);
                            }else{
                                console.log(children);
                            }
                        }
                    ); 
                    
                }
            });
            
            //CREATE COST CENTRE Hierarchy
            
            TypeHierarchy.create({
                name: 'COST_CENTRE_DESCRIPTION',
                description: 'Cost Centre Description'
            }, function(err, result){
                if(err){
                    this.err = err;
                    console.log(err);
                }else{
                    console.log(result);  
                    
                    //CREATE COUNTY CHILDREN

                    TypeHierarchy.create(
                        [
                            { name: 'COST_CENTRE_DESCRIPTION_HR_ADMIN', description: 'HR Admin', parent: result._id, ordinal: '0'},
                        ],
                        function(err, children){
                            if(err){
                                this.err = err;
                                console.log(err);
                            }else{
                                console.log(children);
                            }
                        }
                    ); 
                    
                }
            });
            
            //CREATE ETHNICITY Hierarchy
            
            TypeHierarchy.create({
                name: 'POSITION_DESCRIPTION',
                description: 'Position Description'
            }, function(err, result){
                if(err){
                    this.err = err;
                    console.log(err);
                }else{
                    console.log(result);  
                    
                    //CREATE COUNTY CHILDREN

                    TypeHierarchy.create(
                        [
                            { name: 'POSITION_DESCRIPTION_ADMIN_CONTROLLER', description: 'Admin Controller', parent: result._id, ordinal: '0'},
                        ],
                        function(err, children){
                            if(err){
                                this.err = err;
                                console.log(err);
                            }else{
                                console.log(children);
                            }
                        }
                    ); 
                    
                }
            });
            
            //CREATE EMPLOYEE GROUP DESCRIPTION Hierarchy
            
            TypeHierarchy.create({
                name: 'EMPLOYEE_GROUP_DESCRIPTION',
                description: 'Employee Group Description'
            }, function(err, result){
                if(err){
                    this.err = err;
                    console.log(err);
                }else{
                    console.log(result);  
                    
                    //CREATE COUNTY CHILDREN

                    TypeHierarchy.create(
                        [
                            { name: 'EMPLOYEE_GROUP_DESCRIPTION_EXECUTIVES', description: 'Executives', parent: result._id, ordinal: '0'},
                            { name: 'EMPLOYEE_GROUP_DESCRIPTION_MONTHLY', description: 'Monthly', parent: result._id, ordinal: '1'},
                            { name: 'EMPLOYEE_GROUP_DESCRIPTION_WEEKLY_WAGES', description: 'Weekly Wages', parent: result._id, ordinal: '2'},
                            { name: 'EMPLOYEE_GROUP_DESCRIPTION_OTHER', description: 'Other', parent: result._id, ordinal: '3'},
                        ],
                        function(err, children){
                            if(err){
                                this.err = err;
                                console.log(err);
                            }else{
                                console.log(children);
                            }
                        }
                    ); 
                    
                }
            });
            
            //CREATE EMPLOYEE SUB GROUP Hierarchy
            
            TypeHierarchy.create({
                name: 'EMPLOYEE_SUB_GROUP_DESCRIPTION',
                description: 'Employee Sub Group Description'
            }, function(err, result){
                if(err){
                    this.err = err;
                    console.log(err);
                }else{
                    console.log(result);  
                    
                    //CREATE COUNTY CHILDREN

                    TypeHierarchy.create(
                        [
                            { name: 'EMPLOYEE_SUB_GROUP_DESCRIPTION_FIXED_TERM_EMPLOYEE', description: 'Fixed Term Employee', parent: result._id, ordinal: '0'},
                            { name: 'EMPLOYEE_SUB_GROUP_DESCRIPTION_PERMANENT', description: 'Permanent', parent: result._id, ordinal: '1'},
                            { name: 'EMPLOYEE_SUB_GROUP_DESCRIPTION_POST_RETIREE_FIXED_TERM', description: 'Post Retiree Fixed Term', parent: result._id, ordinal: '2'},
                            { name: 'EMPLOYEE_SUB_GROUP_DESCRIPTION_SALARY', description: 'Salary', parent: result._id, ordinal: '3'},
                            { name: 'EMPLOYEE_SUB_GROUP_DESCRIPTION_SUP_FOREMAN_SHIFT', description: 'Sup/Foreman (Shift)', parent: result._id, ordinal: '4'},
                            { name: 'EMPLOYEE_SUB_GROUP_DESCRIPTION_OTHER', description: 'Other', parent: result._id, ordinal: '5'}
                        ],
                        function(err, children){
                            if(err){
                                this.err = err;
                                console.log(err);
                            }else{
                                console.log(children);
                            }
                        }
                    ); 
                    
                }
            });
        }
        
        var result = RefreshTypeHierarchy();
        
    });
    
     /* Handle Type Hierarchies */
	router.get('/admin/get_by_type_hierarchy', function(req, res) {
        
        switch(req.param("type")){
            case 'COUNTRY':
                TypeHierarchy
                    .findOne()
                    .where({ name: 'COUNTRY' })
                    .exec(function(err, result){
                        if(err){
                            console.log(err);
                        }else{
                            TypeHierarchy
                                .find()
                                .where({ parent: result._id })
                                .populate('parent')
                                .exec(function(err, types){
                                    if(err){
                                        console.log(err);
                                    }
                                    res.json({ "data" : types });
                                });
                        }
                    });
                break;
            case 'GENDER':
                TypeHierarchy
                    .findOne()
                    .where({ name: 'GENDER' })
                    .exec(function(err, result){
                        if(err){
                            console.log(err);
                        }else{
                            TypeHierarchy
                                .find()
                                .where({ parent: result._id })
                                .populate('parent')
                                .exec(function(err, types){
                                    if(err){
                                        console.log(err);
                                    }
                                    res.json({ "data" : types });
                                });
                        }
                    });
                break;
            case 'ETHNICITY':
                TypeHierarchy
                    .findOne()
                    .where({ name: 'ETHNICITY' })
                    .exec(function(err, result){
                        if(err){
                            console.log(err);
                        }else{
                            TypeHierarchy
                                .find()
                                .where({ parent: result._id })
                                .populate('parent')
                                .exec(function(err, types){
                                    if(err){
                                        console.log(err);
                                    }
                                    res.json({ "data" : types });
                                });
                        }
                    });
                break;
            case 'COST_CENTRE':
                TypeHierarchy
                    .findOne()
                    .where({ name: 'COST_CENTRE' })
                    .exec(function(err, result){
                        if(err){
                            console.log(err);
                        }else{
                            TypeHierarchy
                                .find()
                                .where({ parent: result._id })
                                .populate('parent')
                                .exec(function(err, types){
                                    if(err){
                                        console.log(err);
                                    }
                                    res.json({ "data" : types });
                                });
                        }
                    });
                break;
            case 'COST_CENTRE_DESCRIPTION':
                TypeHierarchy
                    .findOne()
                    .where({ name: 'COST_CENTRE_DESCRIPTION' })
                    .exec(function(err, result){
                        if(err){
                            console.log(err);
                        }else{
                            TypeHierarchy
                                .find()
                                .where({ parent: result._id })
                                .populate('parent')
                                .exec(function(err, types){
                                    if(err){
                                        console.log(err);
                                    }
                                    res.json({ "data" : types });
                                });
                        }
                    });
                break;
            case 'EMPLOYEE_GROUP_DESCRIPTION':
                TypeHierarchy
                    .findOne()
                    .where({ name: 'EMPLOYEE_GROUP_DESCRIPTION' })
                    .exec(function(err, result){
                        if(err){
                            console.log(err);
                        }else{
                            TypeHierarchy
                                .find()
                                .where({ parent: result._id })
                                .populate('parent')
                                .exec(function(err, types){
                                    if(err){
                                        console.log(err);
                                    }
                                    res.json({ "data" : types });
                                });
                        }
                    });
                break;
            case 'EMPLOYEE_SUB_GROUP_DESCRIPTION':
                TypeHierarchy
                    .findOne()
                    .where({ name: 'EMPLOYEE_SUB_GROUP_DESCRIPTION' })
                    .exec(function(err, result){
                        if(err){
                            console.log(err);
                        }else{
                            TypeHierarchy
                                .find()
                                .where({ parent: result._id })
                                .populate('parent')
                                .exec(function(err, types){
                                    if(err){
                                        console.log(err);
                                    }
                                    res.json({ "data" : types });
                                });
                        }
                    });
                break;
            case 'POSITION_DESCRIPTION':
                TypeHierarchy
                    .findOne()
                    .where({ name: 'POSITION_DESCRIPTION' })
                    .exec(function(err, result){
                        if(err){
                            console.log(err);
                        }else{
                            TypeHierarchy
                                .find()
                                .where({ parent: result._id })
                                .populate('parent')
                                .exec(function(err, types){
                                    if(err){
                                        console.log(err);
                                    }
                                    res.json({ "data" : types });
                                });
                        }
                    });
                break;
        }
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
        res.render('admin/employees', { user: req.user });
	});
    
    /* GET employees list. */
	router.get('/admin/employees-table.json', function(req, res) {
        Employee
            .find()
            .where({ '_created_by': req.user._id })
            .populate('manager')
            .populate('_created_by')
            .populate('nationality')
            .populate('ethnicity')
            .populate('cost_centre')
            .populate('position')
            .populate('employee_group_description')
            .populate('employee_sub_group_description')
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
                    
                    if(employees[i].nationality == null){
                        objArray.push("");
                    }else{
                        objArray.push(employees[i].nationality.description);
                    }
                    
                    objArray.push(employees[i].email);
                    objArray.push(employees[i].cellphone);
                    
                    if(employees[i].ethnicity == null){
                        objArray.push("");
                    }else{
                        objArray.push(employees[i].ethnicity.description);
                    }
                    
                    objArray.push(employees[i].position);
                    
                    if(employees[i].manager == null){
                        objArray.push("");
                    }else{
                        objArray.push(employees[i].position.description);
                    }
                    
                    if(employees[i].cost_centre == null){
                        objArray.push("");
                    }else{
                        objArray.push(employees[i].cost_centre.description);
                    }
                    
                    if(employees[i].employee_group_description == null){
                        objArray.push("");
                    }else{
                        objArray.push(employees[i].employee_group_description.description);
                    }
                    
                    if(employees[i].employee_sub_group_description == null){
                        objArray.push("");
                    }else{
                        objArray.push(employees[i].employee_sub_group_description.description);
                    }
                    
                    if(employees[i]._created_by == null){
                        objArray.push("");
                    }else{
                        objArray.push(employees[i]._created_by.company);
                    }
                    
                    itemArray.push(objArray);
                }
            
                console.log(itemArray);
            
                res.json({ "data" : itemArray });
            });
	});
    
    /* GET employees list. */
	router.get('/admin/employees-raw.json', function(req, res) {
        Employee
            .find()
            .where({ '_created_by': req.user._id })
            .populate('manager')
            .populate('_created_by')
            .exec(function(err, employees){
                if(err){
                    console.log(err);
                }
                res.json({ "data" : employees });
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
                manager: req.body.manager,
                gender: req.body.gender,
                nationality: req.body.nationality,
                ethnicity: req.body.ethnicity,
                position: req.body.position,
                cost_centre: req.body.cost_centre,
                employee_group_description: req.body.employee_group_description,
                employee_sub_group_description: req.body.employee_sub_group_description,
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
    
    
    /* API
    ================================================================================*/
    
    /* GET employees list. */
	router.post('/api/ussd/disclaimer', function(req, res) {
        
        res.type('text/plain');
        res.send(
            'format: ' + req.param('format') +
            'ussd_msisdn: ' + req.param('ussd_msisdn') +
            'ussd_session_id: ' + req.param('ussd_session_id') +
            'ussd_request: ' + req.param('ussd_request') +
            'ussd_type: ' + req.param('ussd_type') +
            'ussd_node_id: ' + req.param('ussd_node_id') +
            'ussd_node_name: ' + req.param('ussd_node_name') +
            'ussd_response_Disclaimer: ' + req.param('ussd_response_Disclaimer')
        );
        
	});

	return router;
}
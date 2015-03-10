var express = require('express');
var request = require('request');
var router = express.Router();

var err;

var Employee = require('../models/employee');
var TypeHierarchy = require('../models/type_hierarchy');
var Message = require('../models/message');
var Group = require('../models/group');

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
    
    /* MESSAGES
    ================================================================================*/
    
    /* GET messages page. */
	router.get('/admin/messages', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('admin/messages', { user: req.user });
	});
    
    /* Handle Login POST */
	router.post('/admin/messages', function(req, res) {
        
        var CreateMessage = function(){
            Message.create({
                group: req.body.group,
                english_content: req.body.english_content,
                zulu_content: req.body.zulu_content,
                sotho_content: req.body.sotho_content,
                _created_by: req.user._id
            }, function(err, message){
                if(err){
                    this.err = err;
                    console.log(err);
                }else{
                    console.log(message);
                    
                    Employee
                        .find()
                        .where({ groups : message.group, _created_by: req.user._id, sms_notifications: true })
                        .populate('language')
                        .exec(function(err, employee){
                            if(err){
                                console.log(err);
                            }else{
                                
                                console.log("Message :" + employee);                              
                                
                                
                                for(var i = 0; i < employee.length; i++){
                                    
                                    if(employee[i].language != null){
                                        
                                        console.log("Yaaaaaaaaaaaaaaay" + employee[i].language.description);
                                        
                                        
                                        if(employee[i].language.description == "English"){
                                            request("http://api.panaceamobile.com/json?action=message_send&username=ThaboShokgolo&password=m0th302015&to=" + employee[i].cellphone + "&text=" + message.english_content + "&from=27726422105&auto_detect_encoding=1", function (error, response, body) {
                                                if (!error && response.statusCode == 200) {
                                                    //console.log(response)
                                                }else{
                                                    //console.log(response)
                                                }
                                            });
                                        }else if(employee[i].language.description == "Zulu"){
                                            request("http://api.panaceamobile.com/json?action=message_send&username=ThaboShokgolo&password=m0th302015&to=" + employee[i].cellphone + "&text=" + message.zulu_content + "&from=27726422105&auto_detect_encoding=1", function (error, response, body) {
                                                if (!error && response.statusCode == 200) {
                                                    //console.log(response)
                                                }else{
                                                    //console.log(response)
                                                }
                                            });
                                        }else if(employee[i].language.description == "Sotho"){
                                            request("http://api.panaceamobile.com/json?action=message_send&username=ThaboShokgolo&password=m0th302015&to=" + employee[i].cellphone + "&text=" + message.sotho_content + "&from=27726422105&auto_detect_encoding=1", function (error, response, body) {
                                                if (!error && response.statusCode == 200) {
                                                    //console.log(response)
                                                }else{
                                                    //console.log(response)
                                                }
                                            });
                                        }
                                    }
                                }
                                
                            }
                    });
                    
                }
            });
        }
        
        CreateMessage();
        
		res.render('admin/messages', { user: req.user, err: err });
        
    });
    
    /* GET employees list. */
	router.get('/admin/messages-table.json', function(req, res) {
        Message
            .find()
            .where({ _created_by: req.user._id })
            .populate('group')
            .populate('_created_by')
            .exec(function(err, message){
                if(err){
                    console.log(err);
                }

                var itemArray = [];

                for(var i = 0; i < message.length; i++){
                    var objArray = [];
                    
                    
                    objArray.push(message[i]._created);
                    
                    objArray.push(message[i].english_content);
                    objArray.push(message[i].zulu_content);
                    objArray.push(message[i].sotho_content);
                    
                    if(message[i].group == null){
                        objArray.push("");
                    }else{
                        objArray.push(message[i].group.name);
                    }
                    
                    itemArray.push(objArray);
                }
            
                console.log(itemArray);
            
                res.json({ "data" : itemArray });
            });
	});
    
    /* GET employees list. */
	router.get('/admin/messages-raw.json', function(req, res) {
        Message
            .find()
            .where({ _created_by: req.user._id })
            .populate('_created_by')
            .exec(function(err, groups){
                if(err){
                    console.log(err);
                }
                res.json({ "data" : groups });
            });
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
                name: 'LANGUAGE',
                description: 'Language'
            }, function(err, result){
                if(err){
                    this.err = err;
                    console.log(err);
                }else{
                    console.log(result);  
                    
                    //CREATE COUNTY CHILDREN

                    TypeHierarchy.create(
                        [
                            { name: 'LANGUAGE_ENGLISH', description: 'English', parent: result._id, ordinal: '0'},
                            { name: 'LANGUAGE_ZULU', description: 'Zulu', parent: result._id, ordinal: '1'},
                            { name: 'LANGUAGE_SOTHO', description: 'Sotho', parent: result._id, ordinal: '2'},
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
            case 'LANGUAGE':
                TypeHierarchy
                    .findOne()
                    .where({ name: 'LANGUAGE' })
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
            .populate('groups')
            .populate('language')
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
                    objArray.push(employees[i].email);
                    objArray.push(employees[i].cellphone);
                    objArray.push(employees[i].pin);
                    
                    if(employees[i].groups == null){
                        objArray.push("");
                    }else{
                        if(employees[i].groups != null){
                            for(var x = 0; x < employees[i].groups.length; x++){
                                objArray.push(employees[i].groups[x].name + " ");
                            }
                        }
                    }
                    
                    if(employees[i].language == null){
                        objArray.push("");
                    }else{
                        objArray.push(employees[i].language.description);
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
                groups: req.body.group,
                language: req.body.language,
                _created_by: req.user._id
            }, function(err, employee){
                if(err){
                    this.err = err;
                    console.log(err);
                }else{
                    request("http://api.panaceamobile.com/json?action=message_send&username=ThaboShokgolo&password=m0th302015&to=" + employee.cellphone + "&text=Hi " + employee.firstname + " " + employee.lastname + ". " + req.user.company + " has added you to Mobile Bulletin for real time communications and updates.&from=27726422105&auto_detect_encoding=1", function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            //console.log(response)
                        }else{
                            //console.log(response)
                        }
                    });
                }
                console.log('deserializing employees:' + employee);
                return GetAllEmployees();
            });
        }
        
        var employees = CreateEmployee();
        
    	// Display the Login page with any flash message, if any
		res.render('admin/employees', { user: req.user, employees : employees, err: err });
        
    });
    
    
    
    /* Groups
    ================================================================================*/
    
    /* GET group page. */
	router.get('/admin/groups', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('admin/groups', { user: req.user });
	});
    
    /* Handle Login POST */
	router.post('/admin/groups', function(req, res) {
        
        var CreateGroup = function(){
            Group.create({
                name: req.body.name,
                _created_by: req.user._id
            }, function(err, group){
                if(err){
                    this.err = err;
                    console.log(err);
                }else{
                    console.log(group);
                }
            });
        }
        
        CreateGroup();
        
		res.render('admin/groups', { user: req.user, err: err });
        
    });
    
    /* GET employees list. */
	router.get('/admin/groups-table.json', function(req, res) {
        Group
            .find()
            .where({ '_created_by': req.user._id })
            .exec(function(err, groups){
                if(err){
                    console.log(err);
                }

                var itemArray = [];

                for(var i = 0; i < groups.length; i++){
                    var objArray = [];
                    
                    objArray.push(groups[i].name);
                    itemArray.push(objArray);
                }
            
                console.log(itemArray);
            
                res.json({ "data" : itemArray });
            });
	});
    
    /* GET employees list. */
	router.get('/admin/groups-raw.json', function(req, res) {
        Group
            .find()
            .where({ '_created_by': req.user._id })
            .populate('manager')
            .populate('_created_by')
            .exec(function(err, groups){
                if(err){
                    console.log(err);
                }
                res.json({ "data" : groups });
            });
	});
    
    /* GET support page. */
	router.get('/admin/support', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('admin/support', { user: req.user });
	});
    
    /* GET dashboard page. */
	router.get('/admin/dashboard', isAuthenticated, function(req, res) {

        Employee.find({_created_by: req.user._id}).count().exec(function(err, totalEmployees){
            if(err){
                console.log(err);
            }else{
                console.log(totalEmployees);
                
                Employee.find({active: true, _created_by: req.user._id}).count().exec(function(err, totalActiveEmployees){
                    if(err){
                        console.log(err);
                    }else{
                        console.log(totalActiveEmployees);
                        
                        Message.find({_created_by: req.user._id}).count().exec(function(err, totalMessages){
                            if(err){
                                console.log(err);
                            }else{
                                console.log(totalMessages);
                                
                                // Display the Login page with any flash message, if any
        
                                res.render('admin/dashboard', { 
                                    user: req.user,
                                    totalEmployees: totalEmployees, 
                                    totalActiveEmployees: totalActiveEmployees,
                                    totalMessages: totalMessages
                                });
                                
                            }
                        });
                        
                    }
                });
                
            }
        });
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
	router.get('/api/ussd/registration_status', function(req, res) {
        
        Employee
            .findOne()
            .where({ employee_no: req.param('ussd_response_Registration') })
            .exec(function(err, employee){
                if(err){
                    console.log(err);
                }else{
                    console.log(employee);
                    if(employee != null){
                        
                        if(employee.active == true){
                            res.type('text/plain');
                            res.send("Mobile Bulletin \n \nPlease note that you are already registered to use Mobile Bulletin. Use your 4 digit pin to login.");
                        }else{
                            
                            var pin = Math.floor(Math.random() * 9000) + 1000;
                            
                            Employee
                                .findOneAndUpdate(
                                    { 'employee_no': req.param('ussd_response_Registration') }, 
                                    { active : 'true', cellphone : req.param('ussd_msisdn'), pin: pin}, 
                                    function(err, employee){
                                        if(err){
                                            console.log(employee);
                                        }else{
                                            console.log(employee);
                                            res.type('text/plain');
                                            
                                            request("http://api.panaceamobile.com/json?action=message_send&username=ThaboShokgolo&password=m0th302015&to=" + employee.cellphone + "&text=Congratulations " + employee.firstname + " " + employee.lastname + ". Your registration to Mobile Bulletin with number " + employee.cellphone + " was successful. Your pin is " + pin + "&from=27726422105", function (error, response, body) {
                                                if (!error && response.statusCode == 200) {
                                                    console.log(response)
                                                }else{
                                                    console.log(response)
                                                }
                                            });
                                            
                                            res.send("Congratulations " + employee.firstname + " " + employee.lastname + ". Your registration to Mobile Bulletin with number " + employee.cellphone + " was successful. Your pin will be sent to you via SMS.");
                                        }
                                    }
                                );
                        }
                        
                    }else{
                        res.type('text/plain');
                        res.send("Mobile Bulletin \n \nIt seems that your employee number is not registered to use Mobile Bulletin. Please contact your human resource personal for more information.");
                    }
                }
            });
	});
    
    /* GET employees list. */
	router.get('/api/ussd/login_status', function(req, res) {
        
        Employee
            .findOne()
            .where({ cellphone: req.param('ussd_msisdn') })
            .exec(function(err, employee){
                if(err){
                    console.log(err);
                }else{
                    console.log(employee);
                    if(employee != null){
                        
                        if(employee.active == true){
                            
                            console.log(employee);
                            res.type('text/plain');
                            res.send("Welcome " + employee.firstname + " " + employee.lastname + ". Please enter your 4 digit pin to continue. \n\n7. Forgot Password");
                            
                        }else{
                            
                            res.type('text/plain');
                        res.send("Mobile Bulletin \n \nIt seems that your Mobile Bulletin account has not been activeted. Please proceed to the registration screen to continue activation. \n\n8. Register \n0. Exit");
                            
                        }
                        
                    }else{
                        res.type('text/plain');
                        res.send("Mobile Bulletin \n \nIt seems that you have not registered to use Mobile Bulletin. Please proceed to the registration screen to register. \n\n 8.Register \n0. Exit");
                    }
                }
            });
	});
    
    /* GET employees list. */
	router.get('/api/ussd/home_info', function(req, res) {
        
        Employee
            .findOne()
            .where({ cellphone: req.param('ussd_msisdn'),  pin: req.param('ussd_response_Login')})
            .exec(function(err, employee){
                if(err){
                    console.log(err);
                }else{
                    console.log(employee);
                    if(employee != null){
                        console.log(employee);
                        res.type('text/plain');
                        res.send("Scaw Metals Group \n\nWelcome " + employee.firstname + " " + employee.lastname + " \n\n1. Change Language \n2. Notifications");
                        
                    }else{
                        console.log(employee);
                        res.type('text/plain');
                        res.send("Mobile Bulletin \n \nYou have entered the wrong pin. Please go back and try again or click 'Forgot Password' to recover your pin. \n\n7. Forgot Password \n9. Back \n0. Exit");
                    }
                }
            });
	});
    
    /* GET employees list. */
	router.get('/api/ussd/forgot_password', function(req, res) {
        
        Employee
            .findOne()
            .where({ cellphone: req.param('ussd_msisdn'),  active: true})
            .exec(function(err, employee){
                if(err){
                    console.log(err);
                }else{
                    console.log(employee);
                    if(employee != null){
                        console.log(employee);
                        
                        request("http://api.panaceamobile.com/json?action=message_send&username=ThaboShokgolo&password=m0th302015&to=" + employee.cellphone + "&text=Hi " + employee.firstname + " " + employee.lastname + " your Mobile Bulletin pin is " + employee.pin + "&from=27726422105", function (error, response, body) {
                            if (!error && response.statusCode == 200) {
                                console.log(response)
                            }else{
                                console.log(response)
                            }
                        });
                        
                        res.type('text/plain');
                        res.send("Scaw Metals Group \n\nThank you " + employee.firstname + " " + employee.lastname + ". Your pin has been sent to you via sms to " + employee.cellphone);
                        
                    }else{
                        console.log(employee);
                        res.type('text/plain');
                        res.send("Mobile Bulletin \n \nIt seems that your account is not active. Please try to register instead.");
                    }
                }
            });
	});
    
    /* GET employees list. */
	router.get('/api/ussd/notification_status', function(req, res) {
        
        Employee
            .findOne()
            .where({ cellphone: req.param('ussd_msisdn'),  pin: req.param('ussd_response_Login')})
            .exec(function(err, employee){
                if(err){
                    console.log(err);
                }else{
                    console.log(employee);
                    if(employee != null){
                        console.log(employee);
                        
                        if(req.param('ussd_response_Notifications') == "1"){
                            
                             if(employee.sms_notifications == true){
                                 Employee
                                    .findOneAndUpdate(
                                        { cellphone: req.param('ussd_msisdn'),  pin: req.param('ussd_response_Login')}, 
                                        { sms_notifications : 'false' }, 
                                        function(err, employee){
                                            if(err){
                                                console.log(employee);
                                            }else{
                                                console.log(employee);
                                                res.type('text/plain');
                                                res.send("Scaw Metals Group \n\nNotifications \n\n1. Turn on SMS Notifications \n9. Back \n0. Exit");
                                            }
                                        }
                                    );
                             }else if(employee.sms_notifications == false){                                 
                                 Employee
                                    .findOneAndUpdate(
                                        { cellphone: req.param('ussd_msisdn'),  pin: req.param('ussd_response_Login')}, 
                                        { sms_notifications : true }, 
                                        function(err, employee){
                                            if(err){
                                                console.log(employee);
                                            }else{
                                                console.log(employee);
                                                res.type('text/plain');
                                                res.send("Scaw Metals Group \n\nNotifications \n\n1. Turn off SMS Notifications \n9. Back \n0. Exit");
                                            }
                                        }
                                    );
                             }
                            
                        }else{
                            if(employee.sms_notifications == true){
                                 Employee
                                    .findOne()
                                    .where({ cellphone: req.param('ussd_msisdn'),  pin: req.param('ussd_response_Login')})
                                    .exec(function(err, employee){
                                            if(err){
                                                console.log(employee);
                                            }else{
                                                console.log(employee);
                                                res.type('text/plain');
                                                res.send("Scaw Metals Group \n\nNotifications \n\n1. Turn off SMS Notifications \n9. Back \n0. Exit");
                                            }
                                        }
                                    );
                             }else if(employee.sms_notifications == false){                                 
                                 Employee
                                    .findOne()
                                    .where({ cellphone: req.param('ussd_msisdn'),  pin: req.param('ussd_response_Login')})
                                    .exec(function(err, employee){
                                            if(err){
                                                console.log(employee);
                                            }else{
                                                console.log(employee);
                                                res.type('text/plain');
                                                res.send("Scaw Metals Group \n\nNotifications \n\n1. Turn on SMS Notifications \n9. Back \n0. Exit");
                                            }
                                        }
                                    );
                             }
                        }
                    }
                }
            });
	});
    
    /* GET employees list. */
	router.get('/api/ussd/language_status', function(req, res) {
        
        Employee
            .findOne()
            .where({ cellphone: req.param('ussd_msisdn'),  pin: req.param('ussd_response_Login')})
            .exec(function(err, employee){
                if(err){
                    console.log(err);
                }else{
                    console.log(employee);
                    if(employee != null){
                        if(req.param('ussd_response_Language') == "2"){
                            TypeHierarchy
                                .findOne()
                                .where({ name: 'LANGUAGE' })
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
                                                }else{                                                    
                                                    Employee
                                                        .findOneAndUpdate(
                                                            { cellphone: req.param('ussd_msisdn'),  pin: req.param('ussd_response_Login')}, 
                                                            { language : types[0]._id }, 
                                                            function(err, employee){
                                                                if(err){
                                                                    console.log(employee);
                                                                }else{
                                                                    console.log(employee);
                                                                    res.type('text/plain');
                                                                    res.send("Scaw Metals Group \n\nLanguage \n\n1. Zulu \n2. English [selected] \n3. Sotho \n9. Back \n0. Exit");
                                                                }
                                                            }
                                                        );
                                                }
                                            });
                                    }
                                });                          
                        }else if(req.param('ussd_response_Language') == "1"){
                            TypeHierarchy
                                .findOne()
                                .where({ name: 'LANGUAGE' })
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
                                                }else{                                                    
                                                    Employee
                                                        .findOneAndUpdate(
                                                            { cellphone: req.param('ussd_msisdn'),  pin: req.param('ussd_response_Login')}, 
                                                            { language : types[1]._id }, 
                                                            function(err, employee){
                                                                if(err){
                                                                    console.log(employee);
                                                                }else{
                                                                    console.log(employee);
                                                                    res.type('text/plain');
                                                                    res.send("Scaw Metals Group \n\nLanguage \n\n1. Zulu [selected] \n2. English \n3. Sotho \n9. Back \n0. Exit");
                                                                }
                                                            }
                                                        );
                                                }
                                            });
                                    }
                                });                          
                        }else if(req.param('ussd_response_Language') == "3"){
                            TypeHierarchy
                                .findOne()
                                .where({ name: 'LANGUAGE' })
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
                                                }else{                                                    
                                                    Employee
                                                        .findOneAndUpdate(
                                                            { cellphone: req.param('ussd_msisdn'),  pin: req.param('ussd_response_Login')}, 
                                                            { language : types[2]._id }, 
                                                            function(err, employee){
                                                                if(err){
                                                                    console.log(employee);
                                                                }else{
                                                                    console.log(employee);
                                                                    res.type('text/plain');
                                                                    res.send("Scaw Metals Group \n\nLanguage \n\n1. Zulu \n2. English \n3. Sotho [selected] \n9. Back \n0. Exit");
                                                                }
                                                            }
                                                        );
                                                }
                                            });
                                    }
                                });                          
                        }else{
                            Employee
                                .findOne()
                                .where({ cellphone: req.param('ussd_msisdn'),  pin: req.param('ussd_response_Login')})
                                .populate('language')
                                .exec(function(err, employee){
                                    if(err){
                                        console.log(err);
                                    }else{
                                        console.log(employee);
                                        if(employee.language.description == "Zulu"){
                                            res.type('text/plain');
                                            res.send("Scaw Metals Group \n\nLanguage \n\n1. Zulu [selected] \n2. English \n3. Sotho \n9. Back \n0. Exit");
                                        }else if(employee.language.description == "English"){
                                            res.type('text/plain');
                                            res.send("Scaw Metals Group \n\nLanguage \n\n1. Zulu \n2. English [selected] \n3. Sotho \n9. Back \n0. Exit");
                                        }else if(employee.language.description == "Sotho"){
                                            res.type('text/plain');
                                            res.send("Scaw Metals Group \n\nLanguage \n\n1. Zulu \n2. English \n3. Sotho [selected] \n9. Back \n0. Exit");
                                        }else{
                                            res.type('text/plain');
                                            res.send("Scaw Metals Group \n\nLanguage \n\n1. Zulu \n2. English \n3. Sotho \n9. Back \n0. Exit");
                                        }
                                    }
                                });
                        }
                    }
                }
            });
	});

	return router;
}
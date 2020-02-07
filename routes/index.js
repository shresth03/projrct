var express = require('express');
var router = express.Router();
var connection = require('../dbconnection');
var sha = require('sha256');
var passport = require('passport');



/* GET home page. */
router.get('/signup', function(req, res, next) {
	res.render('index');

});

router.get('/', function(req, res, next) {
	res.render('login');
});

router.post('/signup', function(req, res, next) {
	firstname = req.body.fname;
	lastname = req.body.lname;
	email = req.body.email;
	password = req.body.password;
	confirm = req.body.confirm;

	if(password != confirm) {
		res.render('index')
	}
	else{
		connection.query('insert into users values(?,?,?,?)', [firstname, lastname, email, sha(password)], function(err, results, fields) {
			if(err) {
				throw err;
			}
			else{
				res.render('login');
			}
		});
	}


});


router.post('/login', passport.authenticate('local.one', { 
	failureRedirect: '/'
	}), (req, res) => {
	req.login(req.user, function(err) {
		if(req.isAuthenticated() == true ) {
			res.end('Login Successful');
			// res.render('transaction', {title: 'Transaction Home', message: ''});
		}
		else{
			res.end('login unsuccessful');
		}
	});
});


router.get('/signout', function(req, res, next) {
	req.logout();
	req.session.destroy();
	res.render('login')

});

passport.serializeUser(function(id, done) 
{
	done(null, id);
});

passport.deserializeUser(function(id, done) 
{
	done(null, id);
});

function authenticationMiddleware () 
{  
	return (req, res, next) => {
		if(req.isAuthenticated() == false) 
		{
			res.end('access denied');
		}
		else
		{
			next();
		}
	}
}


module.exports = router;

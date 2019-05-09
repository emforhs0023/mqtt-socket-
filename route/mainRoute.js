var express = require('express');
var db = require("../db/mainDB");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var passport   = require("../services/passport")
var ensureAuth   = require("../services/ensureAuth")
var urlencodedParser = bodyParser.urlencoded({extended : false})
var router = express.Router();

/* GET home page. */

router.get('/', [ensureAuth],  function(req, res, next) {
	var user_id = req.session.passport.user.user_id

	res.render('main/index',{"user_id":user_id});
});



module.exports = router;

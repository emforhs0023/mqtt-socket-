var express = require("express");
var path = require('path');
var app = express();
var ejs = require("ejs")
var expressLayouts = require('express-ejs-layouts');
var cors = require("cors");
var passport = require("./services/passport");
var session = require("express-session");
var flash = require('connect-flash');
var crypto = require("crypto")

var http = require("http").Server(app);
var io = require("socket.io")(http);

var mqtt = require("./services/MQTTService")
var socketHandler = require("./services/socketHandler");
socketHandler.setSocketIO(io);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//세션 설정
app.use(session({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true
}))

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());


app.set('layout', 'layout');
app.set("layout extractScripts", true);
app.use(expressLayouts);


app.use('/static', express.static(path.join(__dirname, 'public')));
app.use("/css", express.static(__dirname + "/node_modules/jquery-ui-dist"));
app.use("/css", express.static(__dirname+ "/node_modules/bootstrap/dist/css"));
app.use("/js", express.static(__dirname + "/node_modules/jquery/dist"));
app.use("/js", express.static(__dirname + "/node_modules/jquery-ui-dist"));
app.use("/js", express.static(__dirname + "/node_modules/bootstrap/dist/js"));
app.use("/js", express.static(__dirname + "/node_modules/socket/dist/js"));
app.use("/js", express.static(__dirname + "/node_modules/datatables.net/js"));

var loginRoute = require("./route/loginRoute");
var mainRoute = require("./route/mainRoute");


app.use("/login", loginRoute);
app.use("/", mainRoute);


http.listen(9008, "0.0.0.0", function(){
	console.log("server start 9008");
});

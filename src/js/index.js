var express = require('express');
var cookieSession = require('cookie-session'); // middleware for sessions
var bodyParser = require('body-parser'); // middleware for managing the settings

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var app = express();

// Using session // it's compulsory and allows the session cookies to be secured
app.use(cookieSession({ secret: "todotopsecret" }));

// If there is no ToDo list in session, create an empty one
app.use(function(req, res, next){
  if (typeof(req.session.todolist) == "undefined") {
    req.session.todolist = [];
  }
  next();
});

// Route management
app.get("/todo", function(req, res) {
  res.render("todo.ejs", { todolist: req.session.todolist });
});

app.get("/test", function(req, res) {
  res.render("test.ejs", {});
});

app.post("/todo/add/", urlencodedParser, function(req, res) {
  if(req.body.newtodo != "") {
    req.session.todolist.push(req.body.newtodo);
  }
  res.redirect("/todo");
});

app.get("/todo/delete/:id", function(req, res) {
  if(req.params.id != "") {
    req.session.todolist.splice(req.params.id, 1);
  }
  res.redirect("/todo");
});

app.use(function(req, res, next) {
  res.redirect("/todo");
});

// Start server
app.listen(8888);

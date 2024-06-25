//jshint esversion:6

// require two packages
// that you install in cmd
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");


// create app constant by using express
const app = express();

const items = ["Pray", "Cry", "Code"];
const workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));


// get route that sends the user what's up
// when trying to access home route
app.get("/", function(req, res){

    const day = date.getDate();

    // render a file called list
        // pass the var kindOfDay 
        // value will be equal to current var
        res.render("list", {listTitle: day, newListItems: items});
});

app.post("/", function(req, res){

    const item = req.body.newItem;

    if (req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    } else{
        items.push(item);
        res.redirect("/");
    }

});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.post("/work", function(req, res){
    const item = req.body.newItem;

    items.push(item);
    console.log(req.body);

    res.redirect("/");
});

app.get("/about", function(req, res){
    res.render("about");
});


// listen on port 3000
// console log that the server is started
app.listen(3000, function(){
    console.log("Server is running on port 3000");
});
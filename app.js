//Jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs")
const _ = require("lodash");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/clientDB",{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true});


const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public/"));


const clientSchema = new mongoose.Schema({
    email: String
});

const Client = mongoose.model("Client",clientSchema);



app.get("/",function (req,res) {
    res.render("index");
});

app.get("/about",function (req,res) {
    res.render("about");
});

app.get("/service",function (req,res) {
    res.render("service");
});

app.get("/blog",function (req,res) {
    res.render("blog");
});

app.get("/contact",function(req,res) {
    res.render("contact");
});

app.post("/",function (req,res) {
    const newEmail = req.body.email;

    const client = new Client({
        email: newEmail
    });
     
    Client.find({},function (foundClient) {
        if(foundClient){
            console.log("Client already stored in DB");
        }else{
            client.save(function (err) {
        if(err){
            console.log(err);
        }else{
            console.log("New client added to DB");
            res.redirect("/");
        }
    });
        }
    });
 
});


let port = process.env.PORT;
if(port == null || port==""){
    port = 3000
};

app.listen(port,function (req,res) {
    console.log("Server has Started on successfully");
});

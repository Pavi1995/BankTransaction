const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");

const API_PORT = 3001;
const app = express();
const router = express.Router();

//this is out MondoDB database
const dbRoute = "mongodb://jelo:a9bc839993@ds151382.mlab.com:51382/jelotest";

//connects our backend code with the database
mongoose.connect(
 dbRoute,
 {useNewUrlParser : true}
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to database"));

//checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//(optional) only made for logging and
//bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

//this is our get-method
//this method fetches all available data in our databse
router.get("/getData", (req,res) => {
    Data.find((err, data) => { 
    if (err) return res.json({success: false, error: err});
        return res.json({ success: true, data: data});
    });
});

//this is our update method
//this overwrites existing data in our database




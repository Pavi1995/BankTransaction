const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");

const API_PORT = 3001;
const app = express();
const router = express.Router();

//this is out MondoDB database
const dbRoute = "https://downloads.mongodb.org/linux/mongodb-shell-linux-x86_64-ubuntu1804-4.0.6.tgz"

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
router.post("/updateData", (req, res) => {
 const {id , update } = req.body;
 Data.findOneAndUpdate(id, update, err => {
  if (err) return res.json({ success: false, error: err});
  return res.json({ success: true});
 });
});
 
//this is our delete method
//this method removes existing data in our database
router.delete("/deleteData", (req,res) => {
 const { id } = req.body; 
 Data.findAndDelete(id, err => {
  if err return res.send(err);
  return res.json({ success: true });
 });
}); 

//this is our create method
//this method adds new data in our database
router.post("/postData", (req,res) => {
 const {id , message} = req.body;
 
 if((!id && id !== 0) || !message ) {
  return res.json({
   success : false,
   error : "INVALID INPUTS"
  });
 }
data.message = message;
data.id = id;
data.save(err => {
 if err return res.json({ success : false, error : err });
 return res.json({ success: true });
 });
});
 
//append /api for our http requests
app.use("/api", router);

//launch our backend into our port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

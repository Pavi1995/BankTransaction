var mongodb = require('mongodb');
//Create client for mongodb
var mongoClient = mongodb.MongoClient;
//define URL
var url = 'mongodb://localhost:27017/EmployeeDB';
//establish connection
var app = require('express')();
var cors = require('cors');
var bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser());
app.get('/employees', (req, resp) => {
  mongoClient.connect(url, function(err, db) {
    if (!err) {
      console.log(`Connected to database successfully`);
      var collection = db.collection('tblEmployees');
      //var row = { id: '1010', ename: 'Ravi', job: 'Manager', emp: '7000' };

      var cursor = collection.find().toArray((err, records) => {
        if (!err) resp.send(records);
      });
      /*db.collection('tblEmployees')
      .find()
      .toArray((err, docs) => {
        console.log(docs);
      });*/
      /*cursor.each((err, doc) => {
      if (!err) {
        if (doc != null) {
          console.log(JSON.stringify(doc));
          //console.log(JSON.stringify(`${doc.ename} is working as ${doc.job}`));
          //console.log(JSON.stringify(`${doc.ename} earns ${doc.salary}`));
        }
      }
    });*/
    } else {
      console.log(`Error : ${err}`);
    }
  });
});

app.get('/employees/:id', (req, resp) => {
  var id = req.params.id;
  id = id + '';
  console.log(id);
  mongoClient.connect(url, function(err, db) {
    if (!err) {
      console.log(`Connected to database successfully`);
      var collection = db.collection('tblEmployees');
      //var row = { id: '1010', ename: 'Ravi', job: 'Manager', emp: '7000' };

      var row = collection.findOne({ id: id }, function(err, row) {
        if (!err) resp.send(row);
        else resp.send(err);
      });
      //console.log(row);
      //resp.send(row);
    } else {
      console.log(`Error : ${err}`);
    }
  });
});

/*
var client = require('mongodb').MongoClient;
client.connect('mongodb://localhost:27017/EmployeeDB', (err, db) =>
  console.log(!err ? `Connected to Database successfully` : `Error : ${err}`)
);*/

/*var client = require('mongodb').MongoClient.connect(
  'mongodb://localhost:27017/EmployeeDB',
  (err, db) =>
    console.log(!err ? `Connected to Database successfully` : `Error : ${err}`)
);*/

app.post('/addemployee', (req, resp) => {
  var id = req.params.id;
  id = id + '';
  console.log(id);
  var ename = req.params.ename;
  ename = ename + '';
  console.log(ename);
  var job = req.params.job;
  job = job + '';
  console.log(job);
  var employee = req.params.employee;
  employee = employee + '';
  console.log(employee);
  //var row = req.body;
  var row = { id: id, ename: ename, job: job, emp: employee };
  mongoClient.connect(url, function(err, db) {
    if (!err) {
      //row = JSON.stringify(row);
      var collection = db.collection('tblEmployees');
      //Insert Row
      collection.insertOne(row, (err, result) => {
        if (!err) {
          console.log('Row Added Successfully..');
          resp.send(row);
        } else {
          console.log('Failed to add row...');
          resp.send(err);
        }
      });
    }
  });
});

app.delete('/deleteemployee/:id', (req, resp) => {
  var id = req.body;
  mongoClient.connect(url, function(err, db) {
    if (!err) {
      //row = JSON.stringify(row);
      var collection = db.collection('tblEmployees');
      //Delete Row
      collection.remove({ id: id }, (err, result) =>
        console.log(!err ? `Removed Successfully..` : `Choose the right record`)
      );
    }
  });
});

app.put('/updateemployee', (req, resp) => {
  //var id = req.body;
  mongoClient.connect(url, function(err, db) {
    if (!err) {
      //row = JSON.stringify(row);
      var collection = db.collection('tblEmployees');
      //Update Row
      collection.update(
        { ename: 'Raj' },
        { $set: { job: 'Architect' } },
        (err, result) =>
          console.log(!err ? `Row updated successfully` : `Not Updated`)
      );
    }
  });
});

app.listen(9002, () => console.log('API with DB access started listening...'));

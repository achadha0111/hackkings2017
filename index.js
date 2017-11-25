var firebase = require('firebase');
var admin = require("firebase-admin");

var serviceAccount = require("./hckkings.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hackkings2k17.firebaseio.com"
});

var db = admin.database();
var ref = db.ref("/");
var driverRef = ref.child("drivers");
const driver_form = require('./function_driver.js');

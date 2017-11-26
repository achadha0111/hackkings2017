var firebase = require('firebase');
var admin = require("firebase-admin");
var serviceAccount = require("./hckkings.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hackkings2k17.firebaseio.com"
});

const firebaseSetup = function()
{

    var db = admin.database();
    var ref = db.ref("/");

    return ref;
}
module.exports = firebaseSetup

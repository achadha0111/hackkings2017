var firebase = require('firebase');
var admin = require("firebase-admin");

const firebaseSetup = function()
{
    var serviceAccount = require("./hckkings.json");

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://hackkings2k17.firebaseio.com"
    });

    var db = admin.database();
    var ref = db.ref("/");

    return ref;
}
module.exports = firebaseSetup

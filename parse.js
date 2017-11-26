/*
 input looks like this:
 { ToCountry: 'GB',
 ToState: 'Llanelli',
 SmsMessageSid: 'SM0ac6f085e1ec57f5ca03e44bd274b1d3',
 NumMedia: '0',
 ToCity: '',
 FromZip: '',
 SmsSid: 'SM0ac6f085e1ec57f5ca03e44bd274b1d3',
 FromState: '',
 SmsStatus: 'received',
 FromCity: '',
 Body: 'Please please please ',
 FromCountry: 'GB',
 To: '+441554260044',
 ToZip: '',
 NumSegments: '1',
 MessageSid: 'SM0ac6f085e1ec57f5ca03e44bd274b1d3',
 AccountSid: 'ACf710fb920ebfe1e478f4e2a2531067d2',
 From: '+447599938785',
 ApiVersion: '2010-04-01' }
 */
const updateDriverTable = require('./function_driver.js');
const updateRiderTable = require('./function_rider.js');
const updateRiderRequestTable = require('./function_rider_request.js');
const updateDriverRequestTable = require('./function_driver_request.js');
const dbRef = require('./firebase-setup');

const parse = (message) =>
{

    const databaseReference = dbRef();

    const driverReference = databaseReference.child("/drivers");
    const riderReference = databaseReference.child("/riders");

    let textToTranslate = "It looks like you're not registered yet. " +
        "Register as a passenger by texting:" +
        "Register passenger, your name." +
        "Register as a driver by texting:" +
        "Register driver, your name, vehicle type, number of seats available and vehicle registration plate.";

    let userPresentInDriverDb = false;
    let userPresentInRiderDb = true;

    let userMessage = message.Body.split(" ");

    // Adds driver request to table
    if ((userMessage.indexOf("Need") > -1) && (userMessage.indexOf("seats") > -1)) {
        updateDriverRequestTable(userMessage[2], userMessage[4], userMessage[6], Body.from);
    } else if ((userMessage.indexOf("Have") > -1) && (userMessage.indexOf("seats") > -1)) {
        updateRiderRequestTable(userMessage[2], userMessage[4], userMessage[6], Body.from);
    }
    // Check if the user's number exists in the driver table
    driverReference.once("value")
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                if (childSnapshot.val().number === message.From) {
                    userPresentInDriverDb = true;
                    return true;
                }
            });

            // The user is not in the db and we will send them a translated message to register
            if (!userPresentInDriverDb) {
                riderReference.once("value")
                    .then(function(snapshot) {
                        snapshot.forEach(function(childSnapshot) {
                            if (childSnapshot.val().number === message.From) {
                                userPresentInRiderDb = true;
                                return true;
                            }
                        });

                        if (!userPresentInRiderDb) {
                            return translated(textToTranslate);
                        }
                    });


            }

            // The user is present and hence the message is
            else {

            }

        });

    // Check if the user's number exists in the rider table




}

module.exports = parse;


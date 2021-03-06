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

return new Promise(function(res, err) {
  const databaseReference = dbRef();

  const driverReference = databaseReference.child("/drivers");
  const riderReference = databaseReference.child("/riders");

  // let userPresentInDriverDb = false;
  // let userPresentInRiderDb = false;
  let userMessage = message.Body.split(" ");


  // Check if the user's number exists in the driver table
  driverReference.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(riders) {
          let driver = riders.val();
          if (driver.phone_number == message.From)
          {
            if ((userMessage.indexOf("Have") > -1) && (userMessage.indexOf("seats") > -1))
            {
              console.log("GOING IN");
              updateRiderRequestTable(userMessage[2], userMessage[4], userMessage[6], message.From);
              res("We're processing your request!"); // sfdfdffsdfds
              return true;
            }
          }
         });
              riderReference.once("value")
                .then(function(snapshot) {
                    // Check if in rider db
                    snapshot.forEach(function(riders) {
                      let rider = riders.val();
                      if (rider.phone_number == message.From) {
                        if ((userMessage.indexOf("Need") > -1) && (userMessage.indexOf("seats") > -1))
                        {
                          console.log("YAAAAAAAAAAY");
                          updateDriverRequestTable(userMessage[2], userMessage[4], userMessage[6], message.From);
                          res("We're processing your request!");
                          return true;
                        }
                      }

                   });
                   res("It looks like you're not registered yet. " +
                       "Register as a passenger by texting: " +
                       "Register passenger, your name. " +
                       "Register as a driver by texting: " +
                       "Register driver, your name, vehicle type, number of seats available.");
                });
                      //console.log(userPresentInRiderDb);
                      console.log(userMessage);
                      //console.log(userMessage.indexOf("Need") > -1);
                      //console.log(userMessage.indexOf("seats") > -1);
                      // The user was not present in any and we'll ask them to register
                    if ((userMessage.indexOf("Register") > -1) && (userMessage.indexOf("passenger") > -1))
                    {
                      updateRiderTable(userMessage[2],message.From);
                      return res("Welcome, you are now registered as a passenger!");

                    }
                    else  if ((userMessage.indexOf("Register") > -1) && (userMessage.indexOf("driver") > -1))
                      {
                        updateDriverTable(userMessage[2],userMessage[3],userMessage[4],message.From);
                        //textToTranslate = "Welcome, you are now registered as a driver!";
                        return res("Welcome, you are now registered as a driver!");
                      }
                            //res(textToTranslate)
                  // The user is present and hence the message is
                    console.log("3");

        });
});

}
module.exports = parse;

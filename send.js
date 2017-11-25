const send = (text,recipient) => {

  let accountSid = 'ACf710fb920ebfe1e478f4e2a2531067d2';
  let authToken = '9f3175e2b5b8786c1e245bd1750fd513';

  //require the Twilio module and create a REST client
  let client = require('twilio')(accountSid, authToken);

  client.messages.create({
      to: recipient,
      from: "+441554260044",
      body: "This is the ship that made the Kessel Run in fourteen parsecs?",
  }, function(err, message) {
    if(err) {
    console.log(err.message);
  }
  });

}

module.export = send;

const dbRef = require('./firebase-setup.js');

const driver_req = (origin,destination,traveller_number,phone_number) => {
    let databaseReference = dbRef();
    let dreqRef = databaseReference.child("Request_for_driver");
    dreqRef.push({
      origin: origin,
      destination: destination,
      number_of_travellers: traveller_number,
      Requested_by: phone_number,
    },
  );
  }
module.exports = driver_req

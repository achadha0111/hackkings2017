const dbRef = require('./firebase-setup.js')

const rider_req = (origin,destination,vehicle_capacity,type,phone_number) => {
      let databaseReference = dbRef();
      let rreqRef = databaseReference.child("Request_for_rider");
      rreqRef.push({
        origin: origin,
        destination: destination,
        vehicle_capacity: vehicle_capacity,
        type_of_ride: type,
        phone_number: phone_number,
    },
  );
  }
module.exports = rider_req

const dbRef = require('./firebase-setup.js')

const driver_form = (full_name,vehicle_type,vehicle_capacity,phone_number) => {
    let databaseReference = dbRef();
    let driverRef = databaseReference.child("drivers");
    driverRef.push({
      full_name: full_name,
      vehicle_type: vehicle_type,
      vehicle_capacity: vehicle_capacity,
      phone_number: phone_number,
    },
  );
}
module.exports = driver_form

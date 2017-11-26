const dbRef = require('./firebase-setup.js');

const rider_form = (full_name,phone_number) => {
    let databaseReference = dbRef();
    let riderRef = databaseReference.child("riders");
    riderRef.push({
      full_name: full_name,
      phone_number: phone_number,
    },
  );
}
module.exports = rider_form

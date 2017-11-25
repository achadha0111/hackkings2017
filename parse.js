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
const parse = (message) =>
{
  return message.Body;
}

module.exports = parse;

const twilio = require('twilio');
const credentials = require('./twilio_account.json');

const accountSid = 'AC9757218ec7adb23cc85bf038b21b4a27';
const authToken =  '3169ae7b14311490b085d5d8c3d4160f'

module.exports = new twilio.Twilio(accountSid, authToken);

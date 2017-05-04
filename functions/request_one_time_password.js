const admin = require('firebase-admin');
const credentials = require('./twilio_account.json');
const client = require('twilio')(credentials.accountSid, credentials.authToken);

module.exports = function(req, res) {

  if (!req.body.phone) {
    return res.status(422).send({ error: 'You must provide a phone number'});
  }

  const phone = String(req.body.phone).replace(/[^\d]/g, "")


  admin.auth().getUser(phone)
    .then(user => {
      const code = Math.floor((Math.random() * 8999 + 1000));

      client.messages.create({
        body: 'Your code is ' + code,
        to: phone,
        from: '+17165174302'
      }).then((message) => {

        admin.database().ref('users/'+ phone)
          .update({ code: code, active: true }, () => {
            res.send({success: true, messageId: message.sid});
          });

      }).catch((err) => { return res.status(422).send(err); })
  })
    .catch( err => res.status(422).send({ error: err }));

}

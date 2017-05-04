const admin = require('firebase-admin');

module.exports = function(req, res) {

  if(!req.body.phone || !req.body.code) {
    return res.status(422).send({error: 'You must provide Phone Number and Code'})
  }

  const phone = String(req.body.phone).replace(/[^\d]/g, "")
  const code = parseInt(req.body.code);

  admin.auth().getUser(phone)
    .then(() => {
      const ref = admin.database().ref('users/' + phone);
      ref.on('value', snap => {
        ref.off();
        const user = snap.val();
        if(user.code !== code || !user.active) {
          return res.status(422).send({error: 'Code not Valid'});
        }
        ref.update({ active: false });
        admin.auth().createCustomToken(phone)
          .then(token => res.send({ token: token }))
      });
    })
    .catch(err => res.status(422).send({ error: err }));

}

var gcloud = require('google-cloud')({
  projectId: 'one-time-password-24ef8',
  keyFilename: '../service_account.json'
});

module.exports = function(req, res) {

  if (!req.body.image) {
    return res.status(422).send({ error: 'You must provide an image'});
  }


  vision.detectText(req.body.image, function(err, text, apiResponse) {
    res.send(text);
  });


}

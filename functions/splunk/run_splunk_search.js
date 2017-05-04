const splunkjs = require("splunk-sdk");

module.exports = function(req, res) {

  if (!req.body.username) {
    return res.status(422).send({ error: "You must provide your splunk username" });
  }

  if (!req.body.password) {
    return res.status(422).send({ error: "You must provide your splunk password" });
  }

  if (!req.body.host) {
    return res.status(422).send({ error: "You must provide your splunk host" });
  }

  if (!req.body.search) {
    return res.status(422).send({ error: "You must provide a search query" });
  }
  if (!req.body.earliest || !req.body.latest) {
    return res.status(422)
      .send({ error: "You must provide a earliest and latest time" });
  }

  var service = new splunkjs.Service({
    username: req.body.username,
    password: req.body.password,
    host: req.body.host
  });
  service.login(function(err, success) {
    if (err) {
      res.send("login error");
    }

    // Search everything and return the first 10 results
    var searchQuery = req.body.search;

    // Set the search parameters--specify a time range
    var searchParams = {
      earliest_time: req.body.earliest,
      latest_time: req.body.latest
    };

    // Run a oneshot search that returns the job's results
    service.oneshotSearch(searchQuery, searchParams, function(err, results) {
      // Display the results

      res.send(results);
      // var fields = results.fields;
      // var rows = results.rows;
      //
      // for (var i = 0; i < rows.length; i++) {
      //   var values = rows[i];
      //   console.log("Row " + i + ": ");
      //
      //   for (var j = 0; j < values.length; j++) {
      //     var field = fields[j];
      //     var value = values[j];
      //     console.log("  " + field + ": " + value);
      //   }
      // }
    });

    //console.log("Login was successful: " + success);
    // service.jobs().fetch(function(err, jobs) {
    //   res.send(jobs);
    //   // var jobList = jobs.list();
    //   // for (var i = 0; i < jobList.length; i++) {
    //   //   console.log("Job " + i + ": " + jobList[i].sid);
    //   // }
    // });

  });
};

//
// const axios = require("axios");
//
// const creds = {
//   username: "rpujari",
//   password: "Pujari1337"
// };
//
// const TEST = "https://jsonplaceholder.typicode.com/posts"
// const SPLUNK = "https://demo-appmgmt.splunkoxygen.com:8089";
// const SPLUNK_URL =
//   "https://demo-appmgmt.splunkoxygen.com:8089/services/auth/login";
//
// module.exports = function(req, res) {

//
//
//   process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
//   axios.get(SPLUNK).then(function (response) {
//       res.send(response);
//     })
//     .catch(function (error) {
//       res.send('Error');
//     });
//
//
// };

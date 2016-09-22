var axios = require('axios')

var client = {}


client.get = function () {

  axios.get('https://www.google.com/')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

}

// client.get()

module.exports = client 
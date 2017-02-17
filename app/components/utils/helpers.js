//Using axios for performing http requests
var axios = require("axios");

var helpers = {

  runQuery: function(parameters) {
    var route = "/search";
    
    // console.log(parameters);
    // return axios.post(route, parameters).then(function(response) {
    //   return response.data;
    // });
  }
};


module.exports = helpers;

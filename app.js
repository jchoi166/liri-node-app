require("dotenv").config();
//~~~~~~~~~~~~~Spotify Vars~~~~~~~~~~~~~~~~~~~~//
var spottyImport = require("./keys.js")
var Spotify = require("node-spotify-api")
var spotify = new Spotify(spottyImport);
//~~~~~~~~~~~~~ARGV~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

let input = process.argv[2]
// spotify
//   .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
//   .then(function(data) {
//     console.log(data); 
//   })
//   .catch(function(err) {
//     console.error('Error occurred: ' + err); 
//   });

spotify.search({ type: 'track', query: 'All the Small Things', limit: 1 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data.tracks.items[0]); 
  });

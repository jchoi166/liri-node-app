require("dotenv").config();
//~~~~~~~~~~~~~Spotify Vars~~~~~~~~~~~~~~~~~~~~//
var spottyImport = require("./keys.js")
var Spotify = require("node-spotify-api")
var spotify = new Spotify(spottyImport);

//~~~~~~~~~~~~~ARGV~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
let typeInput = process.argv[2]
let nameInput = process.argv.splice(3).toString()

//~~~~~~~~~~~~~Functions~~~~~~~~~~~~~~~~~~~~~~~~//
var songSearch = _ => {
  spotify.search({ type: 'track', query: nameInput, limit: 1 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data.tracks.items[0].artists[0].name); 
  console.log(data.tracks.items[0].name); 
  console.log(data.tracks.items[0].preview_url); 
  console.log(data.tracks.items[0].album.name); 
  });
}

var bandSearch = _ => {

}

var movieSearch = _ => {

}

var random = _ => { 

}

switch(typeInput) {
   case "concert-this": bandSearch()
   break

   case "spotify-this-song": songSearch()
   break 

   case "movie-this": movieSearch()
   break

   case "do-what-it-says": random()
}
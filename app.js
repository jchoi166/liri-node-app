require("dotenv").config();
const fs = require('fs')
const request = require('request')

//~~~~~~~~~~~~~Spotify Vars~~~~~~~~~~~~~~~~~~~~//
var spottyImport = require("./keys.js")
var Spotify = require("node-spotify-api")
var spotify = new Spotify(spottyImport);

//~~~~~~~~~~~~~ARGV~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
let typeInput = process.argv[2]
let nameInput = process.argv.splice(3).toString()

//~~~~~~~~~~~~~Functions~~~~~~~~~~~~~~~~~~~~~~~~//
var songSearch = _ => {
  // if (nameInput = false) {
  //   spotify.search({ type: 'track', query: 'The Sign', limit: 1 }, function(err, data) {
  //     if (err) {
  //       return console.log('Error occurred: ' + err);
  //     }
     
  //   console.log(data.tracks.items[0].artists[0].name); 
  //   console.log(data.tracks.items[0].name); 
  //   console.log(data.tracks.items[0].preview_url); 
  //   console.log(data.tracks.items[0].album.name); 
  //   }); 
  // }
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
  var queryUrl = "https://rest.bandsintown.com/artists/" + nameInput + "/events?app_id=codingbootcamp";  
  
  request(queryUrl, function(error, response, body){
    if (error) {console.log(error)}

    console.log(JSON.parse(body)[0])
  })
}

var movieSearch = _ => {
  var queryUrl = "http://www.omdbapi.com/?t=" + nameInput + "&y=&plot=short&apikey=trilogy";

  // console.log(queryUrl);

  request(queryUrl, function(error, response, body) {

  if (error) {console.log(error)}

  console.log("Title: " + JSON.parse(body).Title);
  console.log("Release Year: " + JSON.parse(body).Year);
  console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
  console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
  console.log("Country: " + JSON.parse(body).Country);
  console.log("Language: " + JSON.parse(body).Language);
  console.log("Plot: " + JSON.parse(body).Plot);
  console.log("Actors: " + JSON.parse(body).Actors);
  // console.log(body)
});
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
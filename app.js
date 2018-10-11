require("dotenv").config();
var fs = require('fs');
var request = require('request');
var moment = require('moment');


//~~~~~~~~~~~~~Spotify Vars~~~~~~~~~~~~~~~~~~~~//
var spottyImport = require("./keys.js")
var Spotify = require("node-spotify-api")
var spotify = new Spotify(spottyImport);

//~~~~~~~~~~~~~ARGV~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
let typeInput = process.argv[2]
let nameInput = process.argv.splice(3).toString()

//~~~~~~~~~~~~~Functions~~~~~~~~~~~~~~~~~~~~~~~~//
//~~~~~Spotify~~~~~//
var songSearch = _ => {
  var songSearcher = x => {
    spotify.search({ type: 'track', query: x, limit: 1 }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      let info = data.tracks.items[0]

      console.log(
        `Artist: ${info.artists[0].name} 
        Track: ${info.name}
        Preview Link!: ${info.preview_url}
        Album: ${info.album.name}`
      );
    });
  }
  if (nameInput) {
    songSearcher(nameInput)
  }
  else {
    songSearcher("the sign")
  }
}
//~~~~~~Bands In Town~~~~~~~//
var bandSearch = _ => {
  var queryUrl = "https://rest.bandsintown.com/artists/" + nameInput + "/events?app_id=codingbootcamp";

  request(queryUrl, function (error, response, body) {
    if (error) { console.log(error) }

    let info = JSON.parse(body)[0]
    console.log(
      `       Venue: ${info.venue.name}
       Location: ${info.venue.city}, ${info.venue.region}
       Date and Time: ${moment(info.datetime).format("LLL")}`
    )
  })
}
//~~~~~OMDB~~~~~~//
var movieSearch = _ => {
  var movieSearcher = x => {
    var queryUrl = "http://www.omdbapi.com/?t=" + x + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (error, response, body) {

      if (error) { console.log(error) }

      let info = JSON.parse(body)
      console.log(
        `      Title: ${info.Title}
      Release Year: ${info.Year} 
      IMDB Rating: ${info.Ratings[0].Value}
      Rotten Tomatoes Rating: ${info.Ratings[1].Value}
      Country: ${info.Country}
      Language: ${info.Language}
      Plot: ${info.Plot}
      Actors: ${info.Actors}`
      )
    });
  }
  
  if (nameInput) {
    movieSearcher(nameInput)
  }
  else {
    movieSearcher("mr nobody")
  }
}
//~~~~~~~Text Reader~~~~~~//
var random = _ => {
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }
    var dataArr = data.split(",");
    typeInput = dataArr[0]
    nameInput = dataArr[1]
    runApp()
  });
}
//~~~~~~~Search Function~~~~~~~//
var runApp = function () {
  switch (typeInput) {
    case "concert-this": bandSearch()
      break

    case "spotify-this-song": songSearch()
      break

    case "movie-this": movieSearch()
      break

    case "do-what-it-says": random()
  }
}

runApp()

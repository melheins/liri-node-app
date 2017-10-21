// Access Files
var fs = require('fs');

// Get Keys
var keys = require('./keys');

// Get Inputs
var input1 = process.argv[2];
var input3 = process.argv[3];


//choose which function to call
function whatToDo() {
    // Checks for tweet finder command
    switch (input1) {
        case 'my-tweets':
            showTweets();
            break;
    }
    // Checks for song finder command
    switch (input1) {
        case 'spotify-this-song':
            findSong();
            break;
    }
    // Checks for movie finder command
    switch (input1) {
        case 'movie-this':
            findMovie();
            break;
    }
    //Checks for
    switch (input1) {
        case 'do-what-it-says':
            command();
            break;
    }
}

// Function to find and display tweets
function showTweets() {
    // Setup twitter client
    var Twitter = require('twitter');
    var client = new Twitter(keys.twitterKeys);
    // Setup twitter parameters
    var params = {screen_name: 'heins_mel', count: 20};
    // Fetch tweets
    client.get('statuses/user_timeline', params, function (error, tweets) {
        if (tweets) {
            //Write each tweet to console log
            for (i = 0; i < tweets.length; i++) {
                console.log('\n', tweets[i].text, tweets[i].created_at);
            }
        }
    });
}

function findSong() {

    var song = '';

    if (input3 === undefined) {
        song = ('The Sign, Ace of Base');
        input3 = song;
    }
    else {
        song = input3
    }
    var Spotify = require('node-spotify-api');

    var music = new Spotify(keys.spotifyKeys);

    music.search({type: 'track', query: input3, limit: 1}, function (err, data) {

        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(data.tracks);
    });
}

function findMovie() {
    var movie = '';
    if (input3 === undefined) {
        movie = ('Mulan');
        input3 = movie;
    }
    else {
        movie = input3
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + input3 + "&y=&plot=short&apikey=40e9cece";
    console.log(input3);
    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log('Release Year: ' + JSON.parse(body).Year + ' Title: ' + JSON.parse(body).Title +
                ' IMDB Rating: ' + JSON.parse(body).imdbRating +
                ' Rotten Tomatoes Rating: ' + JSON.parse(body).Ratings[1].Value +
                ' Country: ' + JSON.parse(body).Country + ' Language: ' + JSON.parse(body).Language +
                ' Quick Plot: ' + JSON.parse(body).Plot + ' Actors: ' + JSON.parse(body).Actors);
        }
    });
}

function command() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        console.log(data);
        var dataArr = data.split(",");
        console.log(dataArr);
    });

}

whatToDo();
const axios = require('axios');
const cheerio = require('cheerio');

// Require HTTP header
var http = require('http');

// Read the Online Radio Box playlist
const url = 'https://onlineradiobox.com/uk/absolute1058/playlist/';
const selector = '#bodyW > div.page > div > div.page__wrapper-4right > div > section > table > tbody > tr.active > td.track_history_item > a';
var lastSong;

// Function to get the last song played with the url and the selector provided
async function getLastSong(url, selector) {
  var result;
  // Use Axios to fetch the website
  await axios.get(url).then((response) => {
    const body = response.data;
    // Load the response into cheerio
    const $ = cheerio.load(body);
    // Access the element that has the last song played
    if (lastSong != $(selector).html()) {
      // Set the last song if the current song is different
      lastSong = $(selector).html();
      console.log(lastSong);
    }
  });
  return lastSong;
}

// Initial get
getLastSong(url, selector);

// Keep looking the playlist every 30 seconds
async function update() {
  await getLastSong(url, selector);
}
setInterval(update, 30000);

// Create HTTP server
http.createServer(function (req, res) {

  // HTTP Status: 200 : OK
  // Content Type: text/html
  res.writeHead(200, {'Content-Type': 'text/html'});

  // Send the last song played
  res.end(lastSong);

}).listen(8080);
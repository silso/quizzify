const express = require('express');
const app = express();
const port = process.env.PORT || 3000;;

// NOTE: using gulp so no rendering, just serving static files
// app.set('views', './views');
// app.set('view engine', 'pug');

app.use(express.static('build'));
app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/build/login.html');
});

app.get('/login', function(req, res) {
  res.sendFile(__dirname + '/build/login.html');
});

app.get('/social', function(req, res) {
  res.sendFile(__dirname + '/build/social.html');
});

app.get('/takequiz', function(req, res) {
  res.sendFile(__dirname + '/build/takequiz.html');
});

app.listen(port, () => console.log(`Quizzify listening on port ${port}!`));
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;;

//init pug
// NOTE: using gulp so no rendering, just serving static files
// app.set('views', './views');
// app.set('view engine', 'pug');

app.use(express.static('build'));

// app.get('/', function(req, res) {
//   res.sendFile('./views/index.html');
// });

app.listen(port, () => console.log(`Quizzify listening on port ${port}!`));
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;;

//init pug
app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', function(req, res) {
  res.render('index');
 });

app.listen(port, () => console.log(`Ledger listening on port ${port}!`));
const express = require('express');
const app = express();
const port = 8000;

const path = require('path');
const PUBLIC_DIRECTORY = path.join(__dirname, 'public');

app.use(express.static(PUBLIC_DIRECTORY));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/addCar', (req, res) => {
  res.render('addCar');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

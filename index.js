const express = require('express');
const axios = require('axios');
const app = express();
const port = 8000;

const path = require('path');
const { response } = require('express');
const PUBLIC_DIRECTORY = path.join(__dirname, 'public');

app.use(express.static(PUBLIC_DIRECTORY));
app.use(express.json());
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const url = 'http://localhost:8002/'
  axios.get(url)
  .then(response => {
    res.render('index', { cars: response.data });;
  })
  .catch(err => {
    console.log(err)
  })
});

app.get('/deleteCar/:id', (req, res) => {
  const carId = req.params.id;
  axios.delete(`http://localhost:8002/cars/${carId}`).then(response => {
    res.redirect('/')
  })
})

app.get('/updateCar/:id', (req, res) => {
  res.render('updateCar', { data: req.params.id })
})

app.get('/addCar', (req, res) => {
  res.render('addCar');
});

app.get('/updateCar', (req, res) => {
  res.render('updateCar');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

const express = require('express');
const axios = require('axios');
const app = express();
const port = 8000;

const upload = require('./upload');
const cloudinary = require('./cloudinary');

const path = require('path');
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

app.get('/deleteCar/:id', (req, res, next) => {
  const carId = req.params.id;
  axios.delete(`http://localhost:8002/cars/${carId}`).then(response => {
    res.redirect('/', {  });
  })
});

app.get('/updateCar/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const cars = await axios.get(`http://localhost:8002/cars/${id}`);
    res.render('updateCar', cars.data);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post('/updateCar/:id', upload.single('image'), (req, res) => {
  const fileBase64 = req.file.buffer.toString("base64");
  const file = `data:${req.file.mimetype};base64,${fileBase64}`;

  cloudinary.uploader.upload(file, { folder: 'uploads' },async function(err, result) {
    if (!!err) {
      console.log(err);
      return res.status(400).json({
        message: "gagal upload"
      })
    }

    const id = req.params.id;
    const body = req.body;
    body.image = result.url;
    try {
      const cars = await axios.put(`http://localhost:8002/cars/${id}`, body);
      return res.redirect('/');
    } catch (err) {
      return res.status(500).json({
        message: "gagal",
        err: err
      })
    }
  })
});

app.get('/addCar', (req, res) => {
  res.render('addCar');
});

app.get('/updateCar', (req, res) => {
  res.render('updateCar');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

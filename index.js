const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
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
app.use(session({
  secret: 'secret',
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: true,
  resave: true
}));
app.use(flash());


// get car list
app.get('/', (req, res) => {
  const url = 'http://localhost:8002/'
  axios.get(url)
  .then(response => {
    res.render('index', { 
      cars: response.data,
      message: req.flash('message'),
      save: req.flash('save')
     });;
  })
  .catch(err => {
    console.log(err)
  })
});

// post / create car
app.post('/addCar', upload, (req, res) => {
  const fileBase64 = req.file.buffer.toString('base64');
  const file = `data:${req.file.mimetype};base64,${fileBase64}`;
  
  cloudinary.uploader.upload(file, async function (err, result) {
    if (!!err) {
      console.log(err)
      return res.status(400).json({
        message: "gagal"
      })
    }
    
    const body = req.body;
    body.image = result.url;
    try {
      await axios.post('http://localhost:8002/cars', body);
      return (
        req.flash('save', 'Data Berhasil Disimpan'),
        res.redirect('/')
        );
    }catch(err) {
        res.status(422).json('cant create car')
      }
  })
})

// delete car by id
app.get('/deleteCar/:id', (req, res) => {
  const carId = req.params.id;
  axios.delete(`http://localhost:8002/cars/${carId}`).then(response => {
    req.flash('message', 'Data Berhasil Dihapus');
    res.redirect('/');
  })
});

// update car data
app.get('/updateCar/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const cars = await axios.get(`http://localhost:8002/cars/${id}`);
    res.render('updateCar', cars.data);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post('/updateCar/:id', upload, (req, res) => {
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

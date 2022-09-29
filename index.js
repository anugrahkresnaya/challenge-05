const exp = require('constants');
const express = require('express');
const app = express();
const port = 8000;

const path = require('path');
const PUBLIC_DIRECTORY = path.join(__dirname, 'public')

app.use(express.static(PUBLIC_DIRECTORY));
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.sendFile('index', { root: PUBLIC_DIRECTORY });
});

app.listen(port, () => {
  console.log(`Server runnning on http://localhost:${port}`);
});

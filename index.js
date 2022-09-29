const express = require('express');
const app = express();
const port = 8000;

const path = require('path');
const PUBLIC_DIRECOTRY = path.join(__dirname, 'public');

app.use(express.static(PUBLIC_DIRECOTRY));
app.set('view engine', 'ejs');

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');

const port = process.env.PORT || 8080;
const app = express();


app.use(express.static(__dirname));
app.use(cors());

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`YouTube Mirrorify Running on PORT: ${port}`);
});

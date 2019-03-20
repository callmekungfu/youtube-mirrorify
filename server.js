require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT || 8080;
const app = express();

const ContactModel = require('./models/contact');

const DATABASE_URL = process.env.MONGO;

mongoose.connect(DATABASE_URL, {
  reconnectTries: 100,
  reconnectInterval: 500,
  autoReconnect: true,
  useNewUrlParser: true,
}, (err) => {
  if (err) {
    console.log(err);
  }
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MONGO ERR: '));

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded());
app.use(cors());

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.post('/email', (req, res) => {
  const { body } = req;
  console.log(body);
  const contactInstance = new ContactModel(body);
  contactInstance.save((err) => {
    if (err) {
      console.log('failed to save');
      console.log(err);
      res.json({
        status: 'failed',
      }).end();
    } else {
      console.log('New Message Saved');
      res.json({
        status: 'success',
      }).end();
    }
  });
});

app.listen(port, () => {
  console.log(`YouTube Mirrorify Running on PORT: ${port}`);
});

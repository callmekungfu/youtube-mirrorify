const mongoose = require('mongoose');

const { Schema } = mongoose;

const ContactSchema = new Schema({
  body: String,
  contact: {
    email: String,
    name: String,
  },
  subject: String,
});

const ContactModel = mongoose.model('ContactModel', ContactSchema);

module.exports = ContactModel;

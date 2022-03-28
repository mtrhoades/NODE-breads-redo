// IMPORTS

// require mongoose 
const mongoose = require('mongoose');
// creating shorthand for the Schema constructor 
const { Schema } = mongoose;


// SCHEMA
const breadSchema = new Schema({
  name: { type: String, required: true },
  hasGluten: Boolean,
  image: { type: String, default: 'http://placehold.it/500x500.png' }
});


// MODEL
const Bread = mongoose.model('Bread', breadSchema);


// Exports
module.exports = Bread;
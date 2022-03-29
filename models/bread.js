// IMPORTS

// require mongoose 
const mongoose = require('mongoose');
// creating shorthand for the Schema constructor 
const { Schema } = mongoose;


// SCHEMA
// schema
const breadSchema = new Schema({
  name: { type: String, required: true },
  hasGluten: Boolean,
  image: { type: String, default: 'http://placehold.it/500x500.png' },
  baker: {
    type: Schema.Types.ObjectID,
    ref: 'Baker'
  }
});


// HELPER METHOD (instance)
// helper methods 
breadSchema.methods.getBakedBy = function(){
  return `${this.name} was baked with love by ${this.baker}`
}


// MODEL
const Bread = mongoose.model('Bread', breadSchema);


// Exports
module.exports = Bread;
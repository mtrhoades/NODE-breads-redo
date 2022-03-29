// dependencies/imports
const mongoose = require('mongoose');
const { Schema } = mongoose

// schema
const bakerSchema = new Schema({
    name: {
        type: String,
        required: true,
        enum: ['Rachel', 'Monica', 'Joey', 'Chandler', 'Ross', 'Phoebe']
    }, 
    startDate: {
        type: Date,
        required: true
    },
    bio: String
}, { toJSON: {virtuals: true }});


// Virtuals:
bakerSchema.virtual('breads', {
    ref: 'Bread',
    localField: '_id',
    foreignField: 'baker'
});


// model
const Baker = mongoose.model('Baker', bakerSchema);

// exports
module.exports = Baker;
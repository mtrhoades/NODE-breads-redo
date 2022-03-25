// IMPORTS/DEPENDENCIES
const express = require('express'); // import express framework
const breads = express.Router(); // use router function for controller variable.

const Bread = require('../models/bread.js'); // importing and using as a variable the model/bread.js file


// INDEX ROUTE (/breads read route)
breads.get('/', (req, res) => {
    res.render('index', {
        breads: Bread,
        title: 'breadCRUD Index Page'
    })
//   res.send(Bread) // showing the data from the model
});


// SHOW (/breads/arrayIndex# read route)
breads.get('/:arrayIndex', (req, res) => {
    if (Bread[req.params.arrayIndex]) {
      res.render('show', {
        bread:Bread[req.params.arrayIndex]
      })
    } else {
      res.render('error404')
    }
});


module.exports = breads


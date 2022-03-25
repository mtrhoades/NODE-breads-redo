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


// NEW
breads.get('/new', (req, res) => {
    res.render('new')
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


// CREATE
breads.post('/', (req, res) => {
    if (!req.body.image) {
      req.body.image = 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
    }
    if(req.body.hasGluten === 'on') {
      req.body.hasGluten = true
    } else {
      req.body.hasGluten = false
    }
    Bread.push(req.body)
    res.redirect('/breads')
});


// Exports
module.exports = breads


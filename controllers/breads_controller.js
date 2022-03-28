// IMPORTS/DEPENDENCIES
const express = require('express'); // import express framework
const breads = express.Router(); // use router function for controller variable.

const Bread = require('../models/bread.js'); // importing and using as a variable the model/bread.js file


// INDEX ROUTE (/breads read route)
breads.get('/', (req, res) => {
    Bread.find()
        .then(foundBreads => {
            res.render('index', {
                breads: foundBreads,
                title: 'breadCRUD Index Page'
            })
    })
//   res.send(Bread) // showing the data from the model
});


// NEW
breads.get('/new', (req, res) => {
    res.render('new')
});


// EDIT
breads.get('/:indexArray/edit', (req, res) => {
    res.render('edit', {
      bread: Bread[req.params.indexArray],
      index: req.params.indexArray
    })
});


// UPDATE
breads.put('/:arrayIndex', (req, res) => {
    if(req.body.hasGluten === 'on'){
      req.body.hasGluten = true
    } else {
      req.body.hasGluten = false
    }
    Bread[req.params.arrayIndex] = req.body
    res.redirect(`/breads/${req.params.arrayIndex}`)
});


// CREATE
breads.post('/', (req, res) => {
    console.log(req.body)
    if(!req.body.image) {
        req.body.image = undefined 
    }
    console.log(req.body)
    if(req.body.hasGluten === 'on') {
      req.body.hasGluten = true
    } else {
      req.body.hasGluten = false
    }
    Bread.create(req.body)
    res.redirect('/breads')
});
  

// SHOW (/breads/id# read route)
breads.get('/:id', (req, res) => {
    Bread.findById(req.params.id)
        .then(foundBread => {
            res.render('show', {
                bread: foundBread
            })
        })
        .catch((err) => {
            res.render('error404')
        })
    // if (Bread[req.params.arrayIndex]) {
    //   res.render('show', {
    //     bread:Bread[req.params.arrayIndex],
    //     index: req.params.arrayIndex,
    //   })
    // } else {
    //   res.render('error404')
    // }
});


// DELETE
breads.delete('/:indexArray', (req, res) => {
    Bread.splice(req.params.indexArray, 1)
    res.status(303).redirect('/breads')
});


// Exports
module.exports = breads


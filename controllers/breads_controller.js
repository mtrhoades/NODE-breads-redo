// IMPORTS/DEPENDENCIES
const express = require('express'); // import express framework
const breads = express.Router(); // use router function for controller variable.
const Baker = require('../models/baker.js'); // imports baker model
const Bread = require('../models/bread.js'); // imports bread model
const baker = require('./bakers_controller.js');


// INDEX ROUTE (/breads read route)
breads.get('/', async (req, res) => {
    const foundBakers = await Baker.find().lean();
    const foundBreads = await Bread.find().limit(10).lean(); 
    res.render('index', {
      breads: foundBreads,
      bakers: foundBakers,
      title: 'Index Page'
    })
});

// breads.get('/', (req, res) => {
//     Baker.find()
//       .then(foundBakers => {
//         Bread.find()
//         .then(foundBreads => {
//             res.render('index', {
//                 breads: foundBreads,
//                 bakers: foundBakers,
//                 title: 'Index Page'
//             })
//         })
//       })
//   })

// breads.get('/', (req, res) => {
//     Bread.find()
//         .then(foundBreads => {
//             res.render('index', {
//                 breads: foundBreads,
//                 title: 'breadCRUD Index Page'
//             })
//     })
// //   res.send(Bread) // showing the data from the model
// });



// NEW
breads.get('/new', (req, res) => {
    Baker.find()
    .then(foundBakers => {
        res.render('new', {
            bakers: foundBakers
        })
    })
});


// EDIT
breads.get('/:id/edit', (req, res) => {
    Baker.find()
      .then(foundBakers => {
          Bread.findById(req.params.id)
            .then(foundBread => {
              res.render('edit', {
                  bread: foundBread, 
                  bakers: foundBakers 
              })
            })
      })
  });

  // breads.get('/:indexArray/edit', (req, res) => {
//     res.render('edit', {
//       bread: Bread[req.params.indexArray],
//       index: req.params.indexArray
//     })
// });



// UPDATE
breads.put('/:id', (req, res) => {
    if(req.body.hasGluten === 'on'){
      req.body.hasGluten = true
    } else {
      req.body.hasGluten = false
    }
    Bread.findByIdAndUpdate(req.params.id, req.body, { new: true }) 
      .then(updatedBread => {
        console.log(updatedBread) 
        res.redirect(`/breads/${req.params.id}`) 
      })
});
// breads.put('/:arrayIndex', (req, res) => {
//     if(req.body.hasGluten === 'on'){
//       req.body.hasGluten = true
//     } else {
//       req.body.hasGluten = false
//     }
//     Bread[req.params.arrayIndex] = req.body
//     res.redirect(`/breads/${req.params.arrayIndex}`)
// });


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
    .catch(err => {
        res.render('error404')
    })
});
  

// SHOW (/breads/id# read route)
breads.get('/:id', (req, res) => {
    Bread.findById(req.params.id)
        .populate('baker')
        .then(foundBread => {
          res.render('show', {
              bread: foundBread
          })
        })
        .catch(err => {
          res.render('error404')
        })
  });




// breads.get('/:id', (req, res) => {
//     Bread.findById(req.params.id)
//         .then(foundBread => {
//             const bakedBy = foundBread.getBakedBy()
//             console.log(bakedBy)
//             res.render('show', {
//                 bread: foundBread
//             })
//         })
//         .catch((err) => {
//             res.render('error404')
//         })






    // if (Bread[req.params.arrayIndex]) {
    //   res.render('show', {
    //     bread:Bread[req.params.arrayIndex],
    //     index: req.params.arrayIndex,
    //   })
    // } else {
    //   res.render('error404')
    // }
// });


// BREADS DATA/SEED ROUTE
breads.get('/data/seed', (req, res) => {
    Bread.insertMany([
        {
          name: 'Rye',
          hasGluten: true,
          image: 'https://images.unsplash.com/photo-1595535873420-a599195b3f4a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        },
        {
          name: 'French',
          hasGluten: true,
          image: 'https://images.unsplash.com/photo-1534620808146-d33bb39128b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        },
        {
          name: 'Gluten Free',
          hasGluten: false,
          image: 'https://images.unsplash.com/photo-1546538490-0fe0a8eba4e6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
        },
        {
          name: 'Pumpernickel',
          hasGluten: true,
          image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
        }
      ])
      .then(createdBreads => {
        res.redirect('/breads')
      })
});



// DELETE
breads.delete('/:id', (req, res) => {
    Bread.findByIdAndDelete(req.params.id)
    .then(deletedBread => {
        res.status(303).redirect('/breads')
    })
    // Bread.splice(req.params.indexArray, 1)
});


// Exports
module.exports = breads


// DEPENDENCIES
const express = require('express'); // importing express framework


// CONFIGURATION
require('dotenv').config(); // importing  dotenv configuration
const PORT = process.env.PORT; // variable for the port # in .env file.
const app = express(); // variable for express required above.


// MIDDLEWARE (what happens between req & res)
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());


// BREADS_CONTROLLER.JS ROUTE
const breadsController = require('./controllers/breads_controller.js'); // import breads_controller.js file
app.use('/breads', breadsController); // use '/breads' as the path


// ROUTES
app.get('/', (req, res) => {
    res.send('Welcome to an Awesome App about Breads')
});
  

// LISTEN
app.listen(PORT, () => { // server listen 
  console.log('nomming at port', PORT);
});
// DEPENDENCIES
const express = require('express'); // importing express framework
const methodOverride = require('method-override');
const mongoose = require('mongoose');


// CONFIGURATION
require('dotenv').config(); // importing  dotenv configuration
const PORT = process.env.PORT; // variable for the port # in .env file.
const app = express(); // variable for express required above.


// MIDDLEWARE (what happens between req & res)
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
app.use(express.static('public')); // gets public folder access for css and images.
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// database connection
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, 
    () => { console.log('connected to mongo: ', process.env.MONGO_URI) }
);


// ROUTES
app.get('/', (req, res) => {
    res.send('Welcome to an Awesome App about Breads')
});


// BREADS_CONTROLLER.JS ROUTE
const breadsController = require('./controllers/breads_controller.js'); // import breads_controller.js file
app.use('/breads', breadsController); // use '/breads' as the path

// BAKERS CONTROLLER ROUTE 
const bakersController = require('./controllers/bakers_controller.js');
app.use('/bakers', bakersController);

  

// 404 error page
app.get("*", (req, res) => {
    res.render('error404')
});


// LISTEN
app.listen(PORT, () => { // server listen 
  console.log('nomming at port', PORT);
});
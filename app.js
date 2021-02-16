const express = require ("express");
const path = require ("path");
const fs = require ("fs");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactdance', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 8000;


// Define Mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    description: String
  });

const contact = mongoose.model('contact', contactSchema);


// Express specific stuff
app.use('/static', express.static('static')); // for serving static files
app.use(express.urlencoded());


// Pug specific stuff
app.set('view engine','pug'); // set the template engine as pug
app.set('views', path.join(__dirname, 'views'));


// ENDPOINTS

// Get Endpoints
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})


// Post Endpoints
app.post('/contact', (req, res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database.");
    }).catch(()=>{
        res.send("item was not saved to the database");
    })

    // res.status(200).render('contact.pug');
})



// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
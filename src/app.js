const express = require('express');
const path = require('path');
const hbs = require('hbs');
const { query } = require('express');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views locations
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static root directory to serve 
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ahmed Elafifi'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About hbs',
        name: 'Ahmed Elafifi'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help hbs',
        name: 'Ahmed Elafifi'
    });
});

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'you must provide an address term'
        });
    }

    const address = req.query.address;
    
    geocode(address, (error, data) => {

        if (error) {
           return res.send({
               error
            });
        }
     
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                 });
             }
     
     
           res.send({
               forecast: data.location, 
               location: forecastData,
               address
           });           
        })
     })
    
    
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        });
    }

    res.send({
        products: []
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ahmed Elafifi',
        errorMessage: ' 404 Help Page Not found.'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ahmed Elafifi',
        errorMessage: '404 Page Not found.'
    });
});

// app.com 
// app.com/help
// app.com/about 

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});


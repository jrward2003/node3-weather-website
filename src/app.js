const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode') 
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

//Paths for Express config
app.use(express.static(path.join(__dirname, '../public')))
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)


app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        name: "Jason W"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:"Help Page",
        name: "Jason",
        helpText: "This is the text"
    })
})


app.get('',(req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Jason"
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:"You must provide an address"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({
                error
            })

        }

        forecast(latitude, longitude, (error, forecastData) =>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address:req.query.address
            })
        })
    })

    //res.send({
    //    location:"Here",
    //    forecast:98,
    //    address: req.query.address
    //})
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You provide a search term'
        })

    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Jason',
        errorMessage: "Help not found"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title:"404",
        name: "Jason",
        errorMessage: "Page not found"
    })
})

//app.com
app.listen(port, () => {
    console.log('Server is up on port ' + port +'.')
})


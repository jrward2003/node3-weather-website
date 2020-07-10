const request = require('request')

const geocode = (address, callback) => {
    const URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoianJ3YXJkMjAwMyIsImEiOiJja2J0bWlwZnIwYmI4MnRycTcycG94MG1yIn0.qtFei1ljBoaO9qY4U6V2mA&limit=1'
    request({url: URL, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services!')
        }
        else if(body.features.length === 0){
            callback('Uable to find location. Try another search')
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
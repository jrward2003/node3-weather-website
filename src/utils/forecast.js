const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f921136c03d4f135f9a3d058281de234&query=' + long + ',' + lat +'&units=f'
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to service')
        }
        else if(body.error){
            callback('Unable to find location')
        }
        else{
            //console.log(body)
            callback(undefined, {
                CurrentTemp: body.current.temperature, 
                Desc: body.current.weather_descriptions[0],
                Image: body.current.weather_icons[0],
                FeelsLike: body.current.feelslike,
                ObsTime: body.current.observation_time,
                LocalTime: body.current.localtime,
                Region: body.current.region
            })
        }
    })
}

module.exports = forecast
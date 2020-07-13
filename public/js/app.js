//console.log('File loaded')

//fetch('http://puzzle.mead.io/puzzle').then((response) => {
//    response.json().then((data) => {
//        console.log(data)
//    })
//})

//fetch('http://localhost:3000/weather?address=boston').then( (response) => {
//    response.json().then( (data) =>{
//        if(data.error){
//            console.log(data.error)
//        }
//        else{
//            console.log(data.location)
//            console.log(data.forecast)
//        }
//    })
//})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
const msg = document.querySelector('#msg3')

message1.textContent = ''
message2.textContent = ''
msg.textContent = ''


weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    const location = search.value


    //console.log(location)
    message1.textContent = 'Loading...'
    message2.textContent = ''
    msg.textContent = ''
    fetch('/weather?address='+ location).then( (response) => {
        response.json().then( (data) =>{
            if(data.error){
                console.log(data.error)
                message1.textContent = data.error
                message2.textContent = ''
                msg.textContent = ''
                document.querySelector('#imgWeather').src = ''
                

            }
            else{
                //console.log(data.forecast)
                message1.textContent = data.location
                document.querySelector('#imgWeather').src = data.forecast.Image
                message2.textContent = data.forecast.CurrentTemp + " " + data.forecast.Desc;
                msg.textContent += ' Feels like ' + data.forecast.FeelsLike
                //console.log(data.location)
                //console.log(data.forecast)
            }
        })
    })

})
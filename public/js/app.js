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

message1.textContent = ''
message2.textContent = ''


weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    const location = search.value


    //console.log(location)
    message1.textContent = 'Loading...'
    message2.textContent = ''
    fetch('/weather?address='+ location).then( (response) => {
        response.json().then( (data) =>{
            if(data.error){
                console.log(data.error)
                message1.textContent = data.error
                //message2.textContent = data.error               
            }
            else{
                message1.textContent = data.location
                message2.textContent = data.forecast
                //console.log(data.location)
                //console.log(data.forecast)
            }
        })
    })

})
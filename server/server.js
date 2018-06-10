const express = require('express')
const bodyParser = require('body-parser')
const geocoding = require('reverse-geocoding');
const port = process.argv[2] || 8080
const app = express()

let users = {
  '0': { name: 'Sharita Ferebee', score: 8.5 },
  '1': { name: 'Miles Griffeth', score: 3 },
  '2': { name: 'Kathleen Menefee', score: 6.8 },
  '3': { name: 'Emely Bower', score: 6.4 },
  '4': { name: 'Hyon Smits', score: 3.5 },
  '5': { name: 'Wai Michalik', score: 6.7 },
  '6': { name: 'Zofia Engh', score: 8.6 },
  '7': { name: 'Jacqui Bastian', score: 3.3 },
  '8': { name: 'Tari Chance', score: 9.9 },
  '9': { name: 'Angelic Hazzard', score: 7.8 },
  '10': { name: 'Modesta Iddings', score: 9.5 },
  '11': { name: 'Mitchell Hinch', score: 9.6 },
  '12': { name: 'Jewel Giddings', score: 8.5 },
  '13': { name: 'Cinthia Sloane', score: 8.6 },
  '14': { name: 'Rebekah Micek', score: 5.8 },
  '15': { name: 'Lucas Fetter', score: 2.3 }
}

let routes = {
  // '0': { user: users['0'], from: { lat: 49.281904, lng: -123.121808 }, to: { lat: 49.254694, lng: -123.098847 }, date: (new Date()).getTime(), totalSeats: 3, remainingSeats: 1, ridingWith: [users['3'], users['6']] },
  // '1': { user: users['0'], from: { lat: 49.259258, lng: -123.162127 }, to: { lat: 49.333930, lng: -123.080164 }, date: (new Date()).getTime(), totalSeats: 2, remainingSeats: 1, ridingWith: [users['10']] },
  // '2': { user: users['0'], from: { lat: 49.098041, lng: -122.668665 }, to: { lat: 48.133705, lng: -122.162355 }, date: (new Date()).getTime(), totalSeats: 2, remainingSeats: 2, ridingWith: [] },
  // '3': { user: users['1'], from: { lat: 47.255247, lng: -122.489425 }, to: { lat: 48.008414, lng: -122.206523 }, date: (new Date()).getTime(), totalSeats: 1, remainingSeats: 1, ridingWith: [] },
  // '4': { user: users['2'], from: { lat: 49.119150, lng: -122.812147 }, to: { lat: 49.228054, lng: -122.600190 }, date: (new Date()).getTime(), totalSeats: 3, remainingSeats: 3, ridingWith: [] },
  // '5': { user: users['2'], from: { lat: 49.360541, lng: -123.098771 }, to: { lat: 49.310513, lng: -123.073642 }, date: (new Date()).getTime(), totalSeats: 2, remainingSeats: 2, ridingWith: [users['11']] },
  // '6': { user: users['1'], from: { lat: 0, lng: 0 }, to: { lat: 0, lng: 0 }, date: (new Date()).getTime(), totalSeats: 2, remainingSeats: 2, ridingWith: [] },
  // '7': { user: users['0'], from: { lat: 0, lng: 0 }, to: { lat: 0, lng: 0 }, date: (new Date()).getTime(), totalSeats: 1, remainingSeats: 1, ridingWith: [] },
  // '8': { user: users['1'], from: { lat: 0, lng: 0 }, to: { lat: 0, lng: 0 }, date: (new Date()).getTime(), totalSeats: 1, remainingSeats: 0, ridingWith: [users['6']] },
  // '9': { user: users['3'], from: { lat: 0, lng: 0 }, to: { lat: 0, lng: 0 }, date: (new Date()).getTime(), totalSeats: 3, remainingSeats: 3, ridingWith: [] },
  // '10': { user: users['1'], from: { lat: 0, lng: 0 }, to: { lat: 0, lng: 0 }, date: (new Date()).getTime(), totalSeats: 2, remainingSeats: 2, ridingWith: [] },
  // '11': { user: users['3'], from: { lat: 0, lng: 0 }, to: { lat: 0, lng: 0 }, date: (new Date()).getTime(), totalSeats: 3, remainingSeats: 1, ridingWith: [users['12'], users['5']] },
}

function toDate(dateStr) {
  const [day, month, year] = dateStr.split("/")
  return new Date(year, month - 1, day)
}

// ******************************************************
// to allow cross-origin
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send({ message: `Server is running on port ${port}` })
})

app.get('/routes', (req, res) => {
  res.send(routes)
})

app.get('/route/:id', (req, res) => {
  const { id } = req.params
  const route = routes[id]
  if (route) {
    res.send(route)
  } else {
    res.status(404).send({ message: `No route found with id: ${id}` })
  }
})

app.post('/route', (req, res) => {
  const route = req.body
  let isEmptyObject = Object.keys(route).length === 0
  if (isEmptyObject) { sendMessageInvalidData(res); return }
  let user = users[route.user._id]
  let ridingWith = route.ridingWith
  route.remainingSeats = route.totalSeats - (route.ridingWith.length)
  const _id = Math.floor(Math.random() * 1000000)
  routes[_id] = route
  res.send({message: 'New route added', route})
})

const sendMessageInvalidData = (res) => {
  res.status(404).send({message: "Invalid data"})
}

app.get('/users', (req, res) => {
  res.send(users)
})

app.get('/user/:id', (req, res) => {
  const { id } = req.params
  const user = users[id]
  if (user) {
    res.send(user)
  } else {
    res.status(404).send({ message: `No user found with id: ${id}` })
  }
})

app.get('/reverseGeocode/:lat/:lng', (req, res) => {
  const config = {
    'latitude': req.params.lat,
    'longitude': req.params.lng,
    'key': 'AIzaSyC5IlpdqkVUJY78IO7umQRAi09C2QowPME'
  }

  geocoding(config, (err, data) => {
    if(err) {
      res.status(404).send({message: err})
    } else {
      let formattedAddress = data['results'][0].formatted_address
      res.send({address: formattedAddress})
    }
  });
})

app.get('*', (req, res) => {
  res.status(404).send({ message: 'Invalid page request' })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

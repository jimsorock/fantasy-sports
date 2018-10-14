const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.json({type: 'application/vnd.api+json'}))
app.use(bodyParser.urlencoded({extended: true}))

const roster = {
  remSalary: 50000,
  players: {}
}

const players = [
  {
    name: 'J. Verlander',
    id: 1,
    salary: 9500,
    fppg: 26.1
  },
  {
    name: 'C. Sale',
    id: 2,
    salary: 9000,
    fppg: 25.6
  },
  {
    name: 'H. Ryu',
    id: 3,
    salary: 7300,
    fppg: 19.9
  },
  {
    name: 'W. Miley',
    id: 4,
    salary: 4500,
    fppg: 12.1
  },
  {
    name: 'J. Martinez',
    id: 5,
    salary: 9700,
    fppg: 10.8
  },
  {
    name: 'M. Betts',
    id: 6,
    salary: 10300,
    fppg: 11.9
  },
  {
    name: 'J. Smoke',
    id: 7,
    salary: 2000,
    fppg: 5.9
  },
  {
    name: 'T. Meadows',
    id: 8,
    salary: 3000,
    fppg: 9.9
  },
  {
    name: 'C. Coolhaus',
    id: 9,
    salary: 11900,
    fppg: 29.9
  },
  {
    name: 'F. Butters',
    id: 10,
    salary: 6500,
    fppg: 15.9
  }
]

// pitchers.sort((a, b) => b.salary - a.salary)

app.post('/add-player', (req, res) => {
  if (roster.players[req.body.id]) {
    return res.json({data:'player already on team'})
  }
  const playerToAdd = players.filter((player) => {
    return player.id == req.body.id
  })
  if (playerToAdd.length) {
    if (roster.remSalary - playerToAdd[0].salary < 0) {
      return res.json({data:'Not enough salary'})  
    }
    roster.players[req.body.id] = playerToAdd[0]
    roster.remSalary = roster.remSalary - playerToAdd[0].salary
  } else {
    return res.json({data:'player not found.'})
  }
  return res.json({data:roster})
})

app.listen(8080, () => {
  console.log('magic happens on 8080')
})

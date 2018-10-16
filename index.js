const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.json({type: 'application/vnd.api+json'}))
app.use(bodyParser.urlencoded({extended: true}))

const roster = {
  remSalary: 50000,
  players: new Map()
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

// players.sort((a, b) => b.salary - a.salary)
app.get('/sort-players', (req, res) => {
  const sortBy = req.query.sort? req.query.sort : 'salary'

  const order = req.query.order? req.query.order: 'desc'

  return res.json({data: mergeSort(players, sortBy, order)})
  // return res.json({data: quickSort(players, sortBy, order)})

  function quickSort(players, sortBy, order) {
    if(players.length < 2) {
      return players;
    }
    const pivot = players[0]
    const lesser = []
    const greater = []
  
    for (let i = 1; i < players.length - 1; i++) {
      players[i][sortBy] > pivot[sortBy] ? greater.push(players[i]) : lesser.push(players[i])
    }
    if (order == 'desc') {
      return quickSort(greater, sortBy, order).concat(pivot, quickSort(lesser, sortBy, order))  
    }

    return quickSort(lesser, sortBy, order).concat(pivot, quickSort(greater, sortBy, order))
  }

  function mergeSort(array, sortBy) {
    if(array.length < 2) {
      return array;
    }
  
    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);
  
    return mergeTopDown(mergeSort(left, sortBy), mergeSort(right, sortBy), sortBy);
  }
  
  function mergeTopDown(left, right, sortBy) {
    var array = [];
  
    while(left.length && right.length) {
      if(left[0][sortBy] < right[0][sortBy]) {
        array.push(left.shift());
      } else {
        array.push(right.shift());
      }
    }
    return array.concat(left.concat(right));
  }
})

app.post('/add-player', (req, res) => {
  if (roster.players.has(req.body.id)) {
    return res.json({data:'player already on team'})
  }
  const playerToAdd = players.find((player) => {
    return player.id == req.body.id
  })
  if (!playerToAdd) {
    return res.json({data:'player not found.'})
  }
  if (roster.remSalary - playerToAdd.salary < 0) {
    return res.json({data:'Not enough salary'})  
  }
  roster.players.set(req.body.id, playerToAdd)
  roster.remSalary = roster.remSalary - playerToAdd.salary
  
  return res.json({data:{
    remSalary: roster.remSalary,
    players: Array.from(roster.players.values())
  }})
})

app.listen(8080, () => {
  console.log('magic happens on 8080')
})

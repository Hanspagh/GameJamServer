var express = require('express')
var router = express.Router()
var highscore = []


router.get('/', function (req, res) {
  if(highscore.length == 0) {
    return res.json("")
  }
  console.log();
  var response = highscore
  .map(function(elem) {
    return `${elem.name},${elem.score}`
  })
  .reduce(function(res, elem) {
    return res + ';' + elem
  })
  res.json(response)
})

router.get('/json', function (req, res) {
    return res.json(highscore)
})


router.post('/', function (req, res) {
  var data = req.body.data.split(',')
  highscore.push({name: data[0], score: data[1]})
  highscore.sort(function(a,b) {
    return b.score - a.score
  })
  return res.status(200).json("nice")
})

module.exports = router
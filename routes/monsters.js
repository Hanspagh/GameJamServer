var express = require('express')
var Monster = require('../data/monster')
var router = express.Router()
var listOfNewMonsters = [];

router.get('/', function (req, res) {
  var response = listOfNewMonsters.map(function(elem) {
    return elem.serialize();
  });
  listOfNewMonsters = []
  if(response.length == 0) {
    return res.json("")
  }
  response = response.reduce(function(elem, res) {
    return res + ';' + elem
  })
  res.json(response)
})

router.post('/', function (req, res) {
  var data = req.body  
  listOfNewMonsters.push(new Monster(data.id, data.x, data.y));
  return res.status(200).json("nice");
})

module.exports = router

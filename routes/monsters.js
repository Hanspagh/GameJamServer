var express = require('express')
var Monster = require('../data/monster')
var router = express.Router()
var listOfNewMonsters = [new Monster(1,10,10), new Monster(2,20,20)];

router.get('/', function (req, res) {
  var response = listOfNewMonsters.map(function(elem) {
    return elem.serialize();
  });
  //listOfNewMonsters = []
  res.json(response)
})

router.post('/', function (req, res) {
  var data = req.body  
  listOfNewMonsters.push(new Monster(data.id, data.x, data.y));
  return res.status(200).json("nice");
})

module.exports = router

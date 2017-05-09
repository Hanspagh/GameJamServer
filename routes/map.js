var express = require('express')
var router = express.Router()
var Map = require('../data/map')

router.get('/', function (req, res) {
  return res.json(map)
})

router.post('/', function (req, res) {
  console.log( req.body.data);
  map = new Map(10,10, req.body.data)
  return res.status(200).json("nice")
})

module.exports = router
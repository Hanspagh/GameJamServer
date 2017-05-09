var express = require('express')
var app = express()
var monsters = require('./routes/monsters')
app.use('/', express.static(__dirname + '/public'));

app.use('/api/monsters', monsters)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

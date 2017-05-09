var express = require('express')
var app = express()
var monsters = require('./routes/monsters')
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use('/', express.static(__dirname + '/public'));

app.use('/api/monsters', monsters)

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
})

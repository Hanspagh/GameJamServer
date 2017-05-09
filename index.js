var express = require('express')
var app = express()
app.use('/', express.static(__dirname + '/public'));

app.get('api/new/monsters', function (req, res) {
  res.json("1,50,50")
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

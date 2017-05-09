var Cell = require('./cell')

function Map(x,y, stringList) {
  this.x = x;
  this.y = y;
  var cells = stringList.split(";")
  
  this.list = cells.map(function(elem) {
    wallData = elem.split("(")[1]
    return new Cell(wallData[0],wallData[2],wallData[4],wallData[6])
  })
}

Map.prototype.cell = function(x,y) {
  return this.list[this.x * x + y]
};

module.exports = Map;

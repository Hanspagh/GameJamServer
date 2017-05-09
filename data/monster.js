// Constructor
function Monster(id,x,y) {
  this.id = id;
  this.x = x;
  this.y = y;
}
// class methods
Monster.prototype.serialize = function() {
  return `${this.id},${this.x},${this.y}`
};
// export the class
module.exports = Monster;

function Hospital(email,name,imagePath,data,region) {
  this.email=email;
  this.imagePath=imagePath;
  this.data=data;
  this.name=name;
  this.region=region;
}


Hospital.prototype.toString = function () {
  return `Hospital (email: ${this.email}, name: ${this.name}, imagePath: ${this.imagePath}, data: ${this.data}, region: ${this.region})`;
};

module.exports = Hospital;

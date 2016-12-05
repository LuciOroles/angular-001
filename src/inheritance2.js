function Shape() {
	this.ownName="SZ-shape"; // contains code that is not specific, not necesary to inherit this code for performance reasons
 }

Shape.prototype.name = "Shape"; // contains all the reusable code
Shape.prototype.toString = function(){
	return this.name;
};

	

//Shape.prototype.name = "Shape";

function TwoDShape() {
}

TwoDShape.prototype = new Shape();
TwoDShape.prototype.constructor = TwoDShape;
TwoDShape.prototype.name = "2D Shape";

function Triangle (side, height) {
	
	this.side = side;
	this.height = height;
	
}

Triangle.prototype = new TwoDShape();
Triangle.prototype.constructor = Triangle;

Triangle.prototype.name = "Triangle";
Triangle.prototype.getArea = function() {
		return this.side* this.height/2;
	};

console.log("Prop that mean to be reused are to be place in the .prototype");

console.log((new TwoDShape()).toString()  + " | ");

var my = new Triangle(5, 10);
console.log(my.getArea()  + " # " + my.toString());
console.log(my.hasOwnProperty('side')); // true 
console.log(my.hasOwnProperty('name')); // false --- comes from upper proto chain

 

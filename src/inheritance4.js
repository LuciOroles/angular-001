console.log("Create temp. contstructor function to not affect the parent object");

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

var F = function () {};
	F.prototype = Shape.prototype;

TwoDShape.prototype = new F();
TwoDShape.prototype.constructor = TwoDShape;
TwoDShape.prototype.name = "2D Shape";

function Triangle (side, height) {
	this.side = side;
	this.height = height;
}

var F1 = function () {};
	F1.prototype = TwoDShape.prototype;

Triangle.prototype = new F1();
Triangle.prototype.constructor = Triangle;

Triangle.prototype.name = "Triangle";
Triangle.prototype.getArea = function() {
		return this.side* this.height/2;
	};





var my = new Triangle(5, 10);

console.log(my.__proto__);
console.log(my.__proto__.__proto__);
console.log(my.hasOwnProperty('side')); // true 
console.log(my.hasOwnProperty('name')); // false --- comes from upper proto chain

 var s = new Shape();
 	console.log( " s the master object: " + s.toString() );

console.log("Create temp. contstructor function to not affect the parent object");

function Shape() {
	this.ownName="SZ-shape"; // contains code that is not specific, not necesary to inherit this code for performance reasons
 }

Shape.prototype.name = "Shape"; // contains all the reusable code
Shape.prototype.toString = function(){
	var constr = this.constructor;
	return constr.uber ? this.constructor.uber.toString() + " ," + this.name : this.name;


	//return this.name;
};

	

//Shape.prototype.name = "Shape";

function TwoDShape() {
}

var F = function () {};
	F.prototype = Shape.prototype;

TwoDShape.prototype = new F();
TwoDShape.prototype.constructor = TwoDShape;
TwoDShape.uber = Shape.prototype;
TwoDShape.prototype.name = "2D Shape";

function Triangle (side, height) {
	this.side = side;
	this.height = height;
}

var F1 = function () {};
	F1.prototype = TwoDShape.prototype;

Triangle.prototype = new F1();
Triangle.prototype.constructor = Triangle;
Triangle.uber = TwoDShape.prototype;

Triangle.prototype.name = "Triangle";
Triangle.prototype.getArea = function() {
		return this.side* this.height/2;
	};





var my = new Triangle(5, 10);
 
console.log(my.toString()); // true 
 
 var s = new Shape();
 	console.log( " s the master object: " + s.toString() );

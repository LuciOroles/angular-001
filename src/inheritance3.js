console.log("copying the prototype is more efficient but it has a side effect\
	 \n when a child modifies the prototype, the parents get the changes, and so do the siblings.");

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

TwoDShape.prototype = Shape.prototype;
TwoDShape.prototype.constructor = TwoDShape;
TwoDShape.prototype.name = "2D Shape";

function Triangle (side, height) {
	this.side = side;
	this.height = height;
}

Triangle.prototype = TwoDShape.prototype;
Triangle.prototype.constructor = Triangle;

Triangle.prototype.name = "Triangle";
Triangle.prototype.getArea = function() {
		return this.side* this.height/2;
	};





var my = new Triangle(5, 10);

console.log(my.getArea()  + " # " + my.toString());
console.log(my.hasOwnProperty('side')); // true 
console.log(my.hasOwnProperty('name')); // false --- comes from upper proto chain

 var s = new Shape();
 	console.log( " s the master object: " + s.toString() );

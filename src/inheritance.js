function Shape() {

	this.name = "Shape";
	this.toString= function () {
		return this.name;
	};
}

//Shape.prototype.name = "Shape";

function TwoDShape() {
	this.name = "2D shape";

}


function Triangle (side, height) {
	this.name = "Triangle";
	this.side = side;
	this.height = height;
	this.getArea = function() {
		return this.side* this.height/2;
	};
}


TwoDShape.prototype = new Shape();
Triangle.prototype = new TwoDShape();
TwoDShape.prototype.constructor = TwoDShape;
Triangle.prototype.constructor = Triangle;



console.log((new TwoDShape()).toString());

var my = new Triangle(5, 10);
console.log(my.getArea()  + " # " + my.toString());

console.log(my instanceof Shape);

console.log(Shape.prototype.isPrototypeOf(my));

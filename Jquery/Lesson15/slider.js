/*
__proto__: the prototype that is referenced by this class 
           (ie what you inherit from) (points up)
prototype: the prototype that is referenced by instances of the class 
           (ie what your children inherit from) (points sideways)

Adding methods to the prototype
*ClassName*.prototype.*functionName* = function(*args*){*body*};

*/
/*
function Slider(direction){
	this.direction = direction;
	//console.log(this); // this is now the current object
	// Add a method to this object 
	this.move = function(){
		console.log('moving');
	};

	// Add a method to the prototype of this object
	Slider.prototype.add = function(){
		console.log('forward');
	}; //this method can be inside or outside the class
	//course favors outside the class but I prefer it to be inside 
	//encapsulation: everything regarding the class is inside the class
}

var slider = new Slider('forward');
console.dir(slider); //print out the object

var slider2 = new Slider('backward');
console.dir(slider2); //print out the object

//console.log(slider.direction);
slider.move();
slider.add();
console.log(Slider.prototype);
//console.log(slider.prototype); //instances do not have a prototype
console.log(slider.__proto__);

if(Slider.prototype === slider.__proto__)
	console.log("The article is true.");
//Move does not appear in the prototype but it will appear in the object itself 
//(ie when you type slider into the console)
//*/

/*
function Slider(direction){
	this.direction = direction;
	Slider.prototype.move = function(){
		console.log('moving ' + this.direction);
	}; 	
}

var slider = new Slider('forward');
console.log(slider.direction);
var slider2 = new Slider('backward');
console.log(slider2.direction);

slider.move();
slider2.move();
//*/

function Slider(container, nav){
	this.container = container;
	this.nav = nav.show();

	this.imgs = this.container.find('img');
	this.imgWidth = this.imgs[0].width;
	this.imgsLen = this.imgs.length;

	this.current = 0;



	Slider.prototype.transition = function(coords){
		this.container.animate({
			'margin-left': coords || -1*(this.current * this.imgWidth) //coords if set otherwise calculate
		});
	};

	Slider.prototype.setCurrent = function(dir){
		//(dir === 'next')  ? this.current++ : this.current--;
		/*Equivalent
		if(dir === "next"){
			this.current++;
		} else {
			this.current--;
		} //*/
		
		/*
		//~~ will cast a boolean into a integer true will be 1 and false will be 0
		this.current += ( ~~(dir === 'next') || -1 ); // 0 is false in javascript 
		this.current = ( this.current < 0 ) ? this.imgsLen - 1 : this.current % this.imgsLen;
		// works but is awkward to read. Refactor! //*/

		//refactored
		var pos = this.current; //copies the value and not save the reference
		pos += ( ~~(dir === 'next') || -1 );
		this.current = (pos < 0) ? this.imgsLen - 1 : pos % this.imgsLen;
		
		//console.log(this.current);
		return pos;
	};
}
//var slider = new Slider( $('div.slider'), $('#slider-nav') );
//console.log(slider.container);
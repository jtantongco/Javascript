function Slider(container, nav){
	this.container = container;
	this.nav = nav.show();

	this.imgs = this.container.find('img');
	this.imgWidth = this.imgs[0].width;
	this.imgsLen = this.imgs.length;

	this.current = 0;

	Slider.prototype.transition = function(coords){
		this.container.animate({
			'margin-left': coords || -1*(this.current * this.imgWidth) 
		});
	};

	Slider.prototype.setCurrent = function(dir){
		var pos = this.current; 
		pos += ( ~~(dir === 'next') || -1 );
		this.current = (pos < 0) ? this.imgsLen - 1 : pos % this.imgsLen;
		
		return pos;
	};

	/* Design decision from previous lesson: keep file DOM free
	But what if we want button controls in slider.js?
	slider.nav.find('button').on('click',function(){
	slider.setCurrent( $(this).data('dir') );
	slider.transition();
	*/

	//this.events.click.call(this); //will not work if placed here

	//if structured like this then events must be defined before this.events.click.call(this)
	//function will also work if placed outside the constructor
	Slider.prototype.events = {
		click: function(){
			var self = this;
			//console.log(this); //refers to events objects that we just created by default
			self.nav.find('button').on('click',function(){
				//this refers to the button that was clicked by default
				var current = self.setCurrent( $(this).data('dir') );
				self.transition();
			});
		}
	};

	this.events.click.call(this);
}
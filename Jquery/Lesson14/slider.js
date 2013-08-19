(function($){ //bind the jQuery object to $ -> get rid of ambiguity
	//if javascript is enabled and this executes, change the overflow to hidden
	var 	sliderUL = $('div.slider').css('overflow','hidden').children('ul'),
			imgs = sliderUL.find('img'), 						//find all the imgs containted in slider list
			imgWidth = imgs.first().width(), 				//don't hard code img width
			/* Equivalent lines of code:
			imgWidth = imgs[0].width; //regular javascript -> process node
         imgWidth = imgs.first().width;
			imgWidth = imgs.width();
			
			//similar but no quite equivalent
			imgWidth = img.first().css('width'); //gives 600px (as a string?)
			*/
			imgsLen = imgs.length,								//don't hard code number of images
			current = 1,											//which image user is on -> default is the 1st
			totalImgsWidth = imgsLen * imgWidth;			//assumes all images are equal width

	$('#slider-nav').show().find('button').on('click', function(){
		//figure out which direction to go by extracting data-dir
		var direction = $(this).data('dir');
		var loc = imgWidth;
		//var direction = $(this).attr('data-dir'); //Equivalent
		//console.log(direction);

		//update current value
		(direction  === 'next') ? ++current : --current;						
		/* Equivalent
		(direction  == 'next') ? current++ : current--;
		//slightly diffrent but equivalent with respect to the next line of code
		
		if(direction  == 'next'){
			current++;
		} else {
			current--;
		}
		*/
		//console.log(current);		
		
		if(current === 0){
			current = imgsLen;
			direction = 'next';
			loc = totalImgsWidth - imgWidth;
		} else if (current - 1 === imgsLen) {
			current = 1; 
			loc = 0;
		}

		transistion(sliderUL, loc, direction);
	});

	function transistion( container, loc, direction ){
		var unit; // -= or +=
		if( direction && loc != 0) {
			unit = (direction === 'next') ? '-=' : '+='; 
		} 
		container.animate({
			'margin-left':unit ? (unit+loc):loc //if unit is set -> concatenate unit to loc or jus use loc
		});
	}

})(jQuery); //argument passed in: jQuery object

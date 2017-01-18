//store all points in array
var pointsArray = document.getElementsByClassName('point');

//	function to change the style of points
var revealPoints = function(point){
			point.style.opacity = 1;
			point.style.transform = "scaleX(1) translateY(0)";
			point.style.msTransform = "scaleX(1) translateY(0)";
			point.style.WebkitTransform = "scaleX(1) translaindexeY(0)";
}

// function that takes in points
var animatePoints = function(points){
	
	forEach(points, revealPoints)
	
};

// when the window loads
window.onload = function() {
	 // Automatically animate the points on a tall screen where scrolling can't trigger the animation
    if (window.innerHeight > 950) {
			animatePoints(pointsArray);
     }
	
	// save the first selling point class
  var sellingPoints = document.getElementsByClassName('selling-points')[0];
	
	// set scroll distance
  var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
	
//	scrolling animation
  window.addEventListener("scroll", function(event) {
		
		// when user scroll is bigger the than the set distance
    if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
			// call function to animate the array
			animatePoints(pointsArray);   
    }
	});
}

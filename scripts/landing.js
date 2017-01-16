var animatePoints = function(){
	
	var points = document.getElementsByClassName('point');
	
	var revealPoints = function(p){
				points[p].style.opacity = 1;
				points[p].style.transform = "scaleX(1) translateY(0)";
				points[p].style.msTransform = "scaleX(1) translateY(0)";
				points[p].style.WebkitTransform = "scaleX(1) translateY(0)";
	}
	
	for(var i = 0; i <= points.length; i++){
	revealPoints(i);
	}
}

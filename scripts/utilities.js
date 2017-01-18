//Use a loop to go through all elements in the points array.
//Execute a callback for each element.

function forEach(points, callback){
	for(var i = 0; i <= points.length; i++){
		callback(points[i]);
	}
}


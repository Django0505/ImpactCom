var path = require('path'); 

path.exists('foo.txt', function(rr){
	console.log(rr);
}); 

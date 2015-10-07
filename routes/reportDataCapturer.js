var fs = require('fs');

module.exports = {

	save_data : function(data, filename){

		return fs.writeFile(filename, JSON.stringify(data));

	},
	read_data : function(filename){
		var data = fs.readFileSync(filename);
		console.log(JSON.parse(JSON.stringify(data)));
		return data;
	}	
}
'use strict';

var Jexcel = {};

(function(){
	function getExport(csv, fileName){
		if(csv.length > 0) {
			var uri = 'data:text/csv;charset=utf-8,' + escape(csv);
			var link = document.createElement("a");
			link.href = uri;
			link.style = "visibility:hidden";
			link.download = (fileName || "default") + ".csv";
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	}
	Jexcel.exportArr = function (jsonData, fileName) {
		if (jsonData === null || jsonData === undefined || jsonData.length === 0) {
			return;
		}

		var data = jsonData.map(function(row, rowindex){
			var formatRow = row.map(function(cell, colindex){
				return "\"" + (cell||"") + "\"";
			});
			return formatRow.join(",");
		});

		var csv = data.join("\r\n");
		getExport(csv, fileName);
	};

	Jexcel.exportObject = function (jsonData, fileName) {
		if (jsonData === null || jsonData === undefined || jsonData.length === 0) {
			return;
		}

		var header = [];
		for(var key in jsonData[0]) {
			header.push(key);
		}
		var body = [];
		jsonData.forEach(function (item, index) {
			var row = [];
			header.forEach(function(prop) {
			   row.push(item[prop] || "");
			});
			body.push(row);
		});
		
		var data = new Array(header).concat(body);
		
		return this.exportArr(data, fileName);
	};
})();

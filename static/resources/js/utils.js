function setFieldsValueFromData(data) {
	if (data != null) {
		for (var key in data) {
			if (data.hasOwnProperty(key)) {
				document.getElementById(key).value = data[key];
				console.log(key + " -> " + data[key]);
			}
		}
	}
}

function convertPtBrDateToUsDate(date) {
	console.log("converting " + date + "...");
	var ptBrDatePattern = /(\d{2})\/(\d{2})\/(\d{4})/g;
	var matcher = ptBrDatePattern.exec(date);
	if (matcher != null) {
		return "" + matcher[3] + "-" + matcher[2] + "-" + matcher[1];
	} else {
		return date;
	}
}

function setTableHeaderAlias(headerAlias) {
	if (headerAlias != null && headerAlias != undefined) {
		var headers = document.getElementsByClassName("dynatable-sort-header");
		for (var i = 0; i < headers.length; i++) {
			if ($.inArray(headers[i].innerHTML, Object.keys(headerAlias)) > -1) {
				console.log(headers[i].innerHTML);
				headers[i].innerHTML = headerAlias[headers[i].innerHTML];
				console.log(headers[i].innerHTML);
			}
		}
	}
}
function openPage(pageName, elmnt, color) {
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablink");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].style.backgroundColor = "";
	}
	document.getElementById(pageName).style.display = "block";
	elmnt.style.backgroundColor = color;

}
// Get the element with id="defaultOpen" and click on it
// document.getElementById("defaultOpen").click();

function abreAba(aba) {
	document.getElementById(aba).style.display = "block";
}

function goToHome() {
	var win = window.open('/home', "_self");
	win.focus();
}

function myFunction(id) {
	var str1 = "myDIV";
	var divElement = str1.concat(id);
	var x = document.getElementById(divElement);
	if (x.style.display === "none") {
		x.style.display = "block";
	} else {
		x.style.display = "none";
	}
}
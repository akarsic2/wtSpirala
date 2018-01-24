function funk(naziv)
{
	var ajax = new XMLHttpRequest();
	ajax.onreadystatechange = function() {
	if (ajax.readyState == 4 && ajax.status == 200)
		document.getElementById("container").innerHTML = ajax.responseText;
	if (ajax.readyState == 4 && ajax.status == 404)
		document.getElementById("container").innerHTML = "Greska: nepoznat URL";
}

ajax.open("GET", naziv+".html", true);
ajax.send();
}

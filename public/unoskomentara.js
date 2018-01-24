
function funkcijaUp(index){
	var table=document.getElementById("tabela");
    var redovi = table.getElementsByTagName("tr");
	var red=index.parentNode.parentNode;
    if(red.rowIndex != 0){
        var pret=redovi[red.rowIndex-1];
        red.parentNode.insertBefore(red,pret);
    }
}

function funkcijaDown(index) {
	var table=document.getElementById("tabela");
	var redovi = table.getElementsByTagName("tr");
	var red=index.parentNode.parentNode;
    if(red.rowIndex != redovi.length-1){
        var slj=redovi[red.rowIndex+1];
        red.parentNode.insertBefore(slj,red);
    }
}
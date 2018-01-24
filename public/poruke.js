

var Poruke=(function(){
var idDivaPoruka;
var mogucePoruke=["Fakultetski email nije validan",
				  "Indeks nije validan",
				  "Nastavna grupa nije validna ",
			  	  "Akademska godina nije validna",
				  "Password nije validan",
				  "Passwordi se ne podudaraju",
				  "Bitbucket URL nije validan",
				  "Bitbucket SSH nije validan",
				  "Naziv repozitorija nije validan",
				  "Ime i prezime nisu validni",
				  "Max broj grupa nije validan",
				  "Semestar nije validan"];
var porukeZaIspisStud=[]; 
var porukeZaIspisNast=[];
return{
	postaviIdDiva:
	function postaviIdDiva(idDiva){
		idDivaPoruka=idDiva;
	},
	ispisiGreske:
	function ispisiGreske(){
		if (idDivaPoruka=="nastdiv")
			var div=document.getElementById(idDivaPoruka).textContent=porukeZaIspisNast;
		else
			var div=document.getElementById(idDivaPoruka).textContent=porukeZaIspisStud;
		

	},
	dodajPoruku:
	function dodajPoruku(broj){
		var ima=false;
		if (idDivaPoruka=="nastdiv")
		{
			for (var i=0;i<porukeZaIspisNast.length;i++)
			{
				if (porukeZaIspisNast[i]==mogucePoruke[broj]) ima=true;
			}
			if (!ima) porukeZaIspisNast.push(mogucePoruke[broj]);
		}
		else
		{
			for (var i=0;i<porukeZaIspisStud.length;i++)
			{
				if (porukeZaIspisStud[i]==mogucePoruke[broj]) ima=true;
			}
			if (!ima) porukeZaIspisStud.push(mogucePoruke[broj]);
		}
		/*for (var i=0;i<porukeZaIspis.length;i++)
		{
			if (porukeZaIspis[i]==mogucePoruke[broj]) ima=true;
		}
		if (!ima) 
		{
			if (idDivaPoruka=="nastdiv")
				porukeZaIspisNast.push(mogucePoruke[broj]);
			else
				porukeZaIspisStud.push(mogucePoruke[broj]);
		}*/
	},
	ocistiGresku:
	function ocistiGresku(broj){
		var poruka=mogucePoruke[broj];
		if (idDivaPoruka=="nastdiv")
		{
			for (var i=0;i<porukeZaIspisNast.length;i++)
			{
				if (porukeZaIspisNast[i]==poruka) porukeZaIspisNast.splice(i,1);
			}
		}
		else
		{
			for (var i=0;i<porukeZaIspisStud.length;i++)
			{
				if (porukeZaIspisStud[i]==poruka) porukeZaIspisStud.splice(i,1);
			}
		}
		Poruke.ispisiGreske();
	}
	

}
}() );
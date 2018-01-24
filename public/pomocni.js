var Pomocni=(function(){

return{
	validirajFakultetski:
	function validirajFakultetski(email){
		if (!Validacija.validirajFakultetski(email))
		{
			Poruke.dodajPoruku(0);
			Poruke.ispisiGreske();
		}
		else
		{
			Poruke.ocistiGresku(0);
		}
	},
	validirajIndex:
	function validirajIndex(index){
		if (!Validacija.validirajIndex(index))
		{
			Poruke.dodajPoruku(1);
			Poruke.ispisiGreske();
		}
		else
		{
			Poruke.ocistiGresku(1);
		}
	},
	validirajGrupu:
	function validirajGrupu(grupa){
		if (!Validacija.validirajGrupu(grupa))
		{
			Poruke.dodajPoruku(2);
			Poruke.ispisiGreske();
		}
		else
		{
			Poruke.ocistiGresku(2);
		}
	},
	validirajAkGod:
	function validirajAkGod(godina){
		if (!Validacija.validirajAkGod(godina))
		{
			Poruke.dodajPoruku(3);
			Poruke.ispisiGreske();
		}
		else
		{
			Poruke.ocistiGresku(3);
		}
		
	},
	validirajPassword: 
	function validirajPassword(password){
		if (!Validacija.validirajPassword(password))
		{
			Poruke.dodajPoruku(4);
			Poruke.ispisiGreske();
		}
		else
		{
			Poruke.ocistiGresku(4);
		}
	},
	validirajPotvrdu: 
	function validirajPotvrdu(string1, string2){
		if (!Validacija.validirajPotvrdu(string1, string2))
		{
			Poruke.dodajPoruku(5);
			Poruke.ispisiGreske();
		}
		else
		{
			Poruke.ocistiGresku(5);
		}
	},
	validirajBitbucketURL:
	function validirajBitbucketURL(url){
		if (!Validacija.validirajBitbucketURL(url))
		{
			Poruke.dodajPoruku(6);
			Poruke.ispisiGreske();
		}
		else
		{
			Poruke.ocistiGresku(6);
		}
	},
	validirajBitbucketSSH: 
	function validirajBitbucketSSH(string){
		if (!Validacija.validirajBitbucketSSH(string))
		{
			Poruke.dodajPoruku(7);
			Poruke.ispisiGreske();
		}
		else
		{
			Poruke.ocistiGresku(7);
		}
	},
	validirajNazivRepozitorija:
	function validirajNazivRepozitorija(regex, string){
		if (!Validacija.validirajNazivRepozitorija(regex, string))
		{
			Poruke.dodajPoruku(8);
			Poruke.ispisiGreske();
		}
		else
		{
			Poruke.ocistiGresku(8);
		}
	},
	validirajImeiPrezime: 
	function validirajImeiPrezime(string){
		if (!Validacija.validirajImeiPrezime(string))
		{
			Poruke.dodajPoruku(9);
			Poruke.ispisiGreske();
		}
		else
		{
			Poruke.ocistiGresku(9);
		}
	},
	postaviMaxGrupa: 
	function postaviMaxGrupa(s)
	{
		if (!Validacija.postaviMaxGrupa(s))
		{
			Poruke.dodajPoruku(10);
			Poruke.ispisiGreske();
		}
		else
		{
			Poruke.ocistiGresku(10);
		}
	},
	postaviTrenSemestar: 
	function postaviTrenSemestar(sem)
	{
		if (!Validacija.postaviTrenSemestar(sem))
		{
			Poruke.dodajPoruku(11);
			Poruke.ispisiGreske();
		}
		else
		{
			Poruke.ocistiGresku(11);
		}
	},
	
}
}());

			

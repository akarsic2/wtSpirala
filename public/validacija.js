var Validacija=(function(){
var maxGrupa=7;
var trenutniSemestar=0;//0 za zimski, 1 za ljetni semestar
return{
	validirajFakultetski:
	function validirajFakultetski(email){
		var regex="^[^]*[a-zA-Z][^]*@etf.unsa.ba$"; //ne mogu biti samo znakovi, mora biti barem jedno slovo
		if (email.match(regex)) return true;
		else return false;
	},
	validirajIndex:
	function validirajIndex(index){
		var regex="[1]([0-9]){4}$";
		if (index.match(regex)) return true;
		else return false;
	},
	validirajGrupu:
	function validirajGrupu(grupa){
		if (isNaN(grupa)) return false;
		if (grupa>maxGrupa || grupa<1) return false;
		else return true;
	},
	validirajAkGod:
	function validirajAkGod(godina){
		var regex="^20..[/]20..$";
		if (!godina.match(regex)) return false;
		var danas=new Date();
		var trenGod=danas.getFullYear();
		var prvi=godina.substr(0,4);
		var drugi=godina.substr(5,9);
		if (trenGod!=prvi && trenGod!=drugi) return false;
		else
		{
			if (trenGod==prvi) trenutniSemestar=0;
			else trenutniSemestar=1;
		}

		return true;
		
	},
	validirajPassword: 
	function validirajPassword(password){
		var regex="^([a-zA-Z0-9]{7,20})$";
		if (!password.match(regex)) return false;
		regex="[A-Z]";
		if (!password.match(regex)) return false;
		regex="[a-z]";
		if (!password.match(regex)) return false;
		regex="[0-9]";
		if (!password.match(regex)) return false;
		return true;
	},
	validirajPotvrdu: 
	function validirajPotvrdu(string1, string2){
		if (string1==string2) return true;
		else return false;
	},
	validirajBitbucketURL:
	function validirajBitbucketURL(url){
		var regex="^https://";
		if (!url.match(regex)) return false;
		var niz=url.split("@");
		regex="^bitbucket.org/";
		if(niz[1]==null) return false;
		if (!niz[1].match(regex)) return false;
		niz=url.split("/");
		if (niz[4]==null) return false;
		var dio=niz[4];
		var niz=dio.split(".");
		if (niz[0]==null) return false;
		if (!Validacija.validirajNazivRepozitorija(null, niz[0])) return false;
		return true;
	} ,
	validirajBitbucketSSH: 
	function validirajBitbucketSSH(string){
		var regex="^git@bitbucket.org:";
		if (!string.match(regex)) return false;
		var niz=string.split("/");
		var niz2=niz[1].split(".");
		if (!Validacija.validirajNazivRepozitorija(null, niz2[0]) ) return false;
		if (niz2[1]!="git") return false;
		return true;
	},
	validirajNazivRepozitorija:
	function validirajNazivRepozitorija(regex, string){
		if (regex==null) regex="^wt(P|p)rojekat1([0-9]){4}$";
		if (string.match(regex)) return true;
		else return false;
	},
	validirajImeiPrezime: 
	function validirajImeiPrezime(string){
		//"sadrzi bar jednu rijec od 3 do 12 slova" mi je malo nejasno bilo
		//shvatila sam da svaka rijec mora imati 3-12 slova, a da input mora sadrzavati barem jednu takvu rijec
		//kao sadrzi bar jednu rijec od 3 do 12 slova (a moze sadrzavati i vise takvih rijeci)
		if (string=="" || string==null) return false;
		var niz=string.split(" ");
		for (var i=0;i<niz.length;i++)
		{
			var regex="^[A-Z]"; //prvo mora biti veliko
			//ako se ovaj uslov zadovolji to znaci da - i ' sigurno nece biti na prvom mjestu
			//a ako ne zadovolji, svakako se vraca false
			//u svakom slucaju nema potrebe da se provjerava jesu li - ili ' na prvom mjestu
			if (!niz[i].match(regex)) return false;
			regex="^(([a-zA-Z]|[*]|[']|Č|č|Ć|ć|Š|š|Ž|ž){3,12})$";
			if (!niz[i].match(regex)) return false;

		}
		return true;
	},
	postaviMaxGrupa: 
	function postaviMaxGrupa(s)
	{
		if (isNaN(s)) return false;
		maxGrupa=s;
		return true;
	},
	postaviTrenSemestar: 
	function postaviTrenSemestar(sem)
	{
		if (sem==0 || sem==1) 
			{
				trenutniSemestar=sem;
				return true;
			}
		else return false;
	},
	
}
}());

			

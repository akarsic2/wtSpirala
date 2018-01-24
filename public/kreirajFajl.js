function validirajKomentar(spirala, index, sadrzaj)
{
    if (spirala.length<1) return false;
    if (index.length<1) return false;
    if (sadrzaj.constructor != Array) return false;
    if (!(sadrzaj.length!=0 &&  sadrzaj[0].constructor==Object)) return false;
    
    return true;
}


function validirajListu(godina, nizRepozitorija)
{
    if (godina.length<1) return false;
    if (nizRepozitorija.constructor != Array) return false;
    if (nizRepozitorija.length<1) return false;
    return true;
}


function validirajIzvjestaj(index){
    if (index.length<1) return false;
    else return true;
}



var KreirajFajl=(function(){
    
    return {
        kreirajKomentar:function(spirala, index, sadrzaj, fnCallback){
            var ajax = new XMLHttpRequest();
            var jsonString;
            var objekat = {
                spirala: spirala,
                index: index,
                sadrzaj: sadrzaj
            };
            jsonString=JSON.stringify(objekat);

            ajax.onreadystatechange = function() {
                if (ajax.readyState == 4 && ajax.status == 200){
                    if (!validirajKomentar(spirala, index,sadrzaj)) fnCallback(-1, "Neispravni parametri");   
                    else fnCallback(null, ajax.responseText);
                }
                if (ajax.readyState == 4 && ajax.status != 200){
                    fnCallback(ajax.status, ajax.responseText);
                }
            }

            ajax.open("POST", "http://localhost:3000/komentar", true);
            ajax.setRequestHeader("Content-Type", "application/json");
            ajax.send(jsonString);
        },
        kreirajListu:function(godina, nizRepozitorija, fnCallback){
            var ajax = new XMLHttpRequest();
            var jsonString;

            var objekat={
                godina: godina,
                nizRepozitorija: nizRepozitorija
                };
                jsonString=JSON.stringify(objekat);

            ajax.onreadystatechange = function() {
                if (ajax.readyState == 4 && ajax.status == 200){
                    if (!validirajListu(godina, nizRepozitorija))
                        fnCallback(-1, "Neispravni parametri"); 
                    else
                        fnCallback(null, ajax.responseText);
                }
                if (ajax.readyState == 4 && ajax.status != 200)
                    fnCallback(ajax.status, ajax.responseText);
                 
            }
            ajax.open("POST", "http://localhost:3000/lista", true);
            ajax.setRequestHeader("Content-Type", "application/json");
            ajax.send(jsonString);
        },
        kreirajIzvjestaj:function(spirala, index, fnCallback){
            var ajax = new XMLHttpRequest();
            var jsonString;

            var objekat={
                spirala: spirala,
                index: index
            };
            jsonString=JSON.stringify(objekat);

            ajax.onreadystatechange = function() {
                if (ajax.readyState == 4 && ajax.status == 200){
                    if (!validirajIzvjestaj(index)) fnCallback(-1, "Neispravni parametri");   
                    else fnCallback(null, ajax.responseText);
                }
                if (ajax.readyState == 4 && ajax.status != 200) fnCallback(ajax.status, ajax.responseText);
            }
            ajax.open("POST", "http://localhost:3000/izvjestaj", true);
            ajax.setRequestHeader("Content-Type", "application/json");
            ajax.send(jsonString);
        },
        kreirajBodove:function(spirala, index, fnCallback){
            var ajax = new XMLHttpRequest();
            var jsonString;

            var objekat={
                spirala: spirala,
                index: index
            };
            jsonString=JSON.stringify(objekat);

            ajax.onreadystatechange = function() {
                if (ajax.readyState == 4 && ajax.status == 200){
                    if (!validirajIzvjestaj(index)) fnCallback(-1, "Neispravni parametri");  
                    else fnCallback(null, ajax.responseText);
                }
                if (ajax.readyState == 4 && ajax.status != 200) fnCallback(ajax.status, ajax.responseText);
            }
            
            ajax.open("POST", "http://localhost:3000/bodovi ", true);
            ajax.setRequestHeader("Content-Type", "application/json");
            ajax.send(jsonString);
        }
    }
})();


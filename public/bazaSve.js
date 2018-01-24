function logujSe()
{
    var username=document.getElementById('username').value;
    var password=document.getElementById('password').value;
    
    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200){
            document.getElementById("container").innerHTML = ajax.responseText;
            
        }
    }

    var podaci=JSON.stringify({username:username,password:password});

    ajax.open("POST","http://localhost:3000/login",true);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send(podaci);
}

function prikaziLogin()
{
    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200)
            document.getElementById("zaglavlje").innerHTML = ajax.responseText;
    }

    ajax.open("GET", "http://localhost:3000/login", true);
    ajax.send();
    
}


function prikaziStatistiku(){
    var ajax = new XMLHttpRequest();
    
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200)
            document.getElementById("cont").innerHTML = ajax.responseText;
    }

    ajax.open("GET", "http://localhost:3000/statistika", true);
    ajax.send();
}

function prikaziUnosKomentara(){
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200)
            document.getElementById("cont").innerHTML = ajax.responseText;
    }

    ajax.open("GET", "http://localhost:3000/unosKomentara", true);
    ajax.send();
}

function prikazNastavnik(){
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200)
            document.getElementById("cont").innerHTML = ajax.responseText;
    }
    ajax.open("GET", "http://localhost:3000/nastavnik", true);
    ajax.send();
}

function prikazUnosSpiska(){
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200)
            document.getElementById("cont").innerHTML = ajax.responseText;
    }
    ajax.open("GET", "http://localhost:3000/unosSpiska", true);
    ajax.send();
}

function prikaziListuKorisnika(){
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200)
            document.getElementById("cont").innerHTML = ajax.responseText;
    }
    ajax.open("GET", "http://localhost:3000/listaKorisnika", true);
    ajax.send();
}

function odjaviSe(){
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200)
        document.getElementById("container").innerHTML = ajax.responseText;
         
    }
    ajax.open("GET", "http://localhost:3000/odjaviSe", true);
    ajax.send();
}


function regNastavnika(){
    var nast=document.getElementById("nastavnikform");
    var stud=document.getElementById("studentform");
    
    stud.style.display="none";
    nast.style.display="block";
    
    
}

function regStudenta(){
    var stud=document.getElementById("studentform");
    stud.style.marginTop=0;
    stud.style.display="block";
    var nast=document.getElementById("nastavnikform");
    nast.style.display="none";
}



function pretrazi()
{
    var ajax = new XMLHttpRequest();
    var pretrazi = document.getElementById('unos').value;
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200)
            document.getElementById("cont").innerHTML = ajax.responseText;
    }
    ajax.open("GET", "http://localhost:3000/listaKorisnika/"+pretrazi, true);
    ajax.send();
}


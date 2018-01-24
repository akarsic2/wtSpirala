//Admin
//username: amilaa 
//password: amilaa

const express = require ('express');
const bodyParser= require('body-parser');
const fs= require('fs');
const app= express();

const Sequelize = require('sequelize');
const sequelize = require('./public/baza.js');
/*LoginKorisnik.sync().then(function(){
    LoginKorisnik.findOrCreate({where: {id:1}, defaults: {username:'amilaa', password:'$2a$10$H9t.LIan8pFs1o8w.3jlL.vaOPUxxnMgV7nHrGmclWCec9AZ/Ta2i', Rola:'2'}});
    LoginKorisnik.findOrCreate({where:{id:2}, defaults: {username:'nastavnikk', password:'$2a$10$H9t.LIan8pFs1o8w.3jlL.vaOPUxxnMgV7nHrGmclWCec9AZ/Ta2i', Rola:'1'}});
    LoginKorisnik.findOrCreate({where:{id:3}, defaults: {username:'adminn', password:'$2a$10$H9t.LIan8pFs1o8w.3jlL.vaOPUxxnMgV7nHrGmclWCec9AZ/Ta2i', Rola:'3'}});
    
});*/


var nastavnikPermission=1;
var studentPermission=2;
var adminPermission=3;

const bcrypt = require('bcrypt');
const saltRounds = 10;

const LoginKorisnik=sequelize.import(__dirname+"/public/loginBaza.js");
const Rola = sequelize.import(__dirname+"/public/rola.js");
const LicniPodaci=sequelize.import(__dirname+"/public/licniPodaci.js");

Rola.sync().then(function(){
    Rola.findOrCreate({where: {id:1}, defaults: {naziv:'Nastavnik'}});
    Rola.findOrCreate({where: {id: 2}, defaults: {naziv: 'Student'}})
    Rola.findOrCreate({where: {id: 3}, defaults: {naziv: 'Administrator'}})
});
LicniPodaci.sync();
LoginKorisnik.sync().then(function(){
    LoginKorisnik.findOrCreate({where:{id:3}, defaults: {username:'amilaa', password:'$2a$10$H9t.LIan8pFs1o8w.3jlL.vaOPUxxnMgV7nHrGmclWCec9AZ/Ta2i', Rola:'3'}});  
});
const SeqOp = Sequelize.Op;

/*LicniPodaci.sync();

LoginKorisnik.sync().then(function(){
    LoginKorisnik.findOrCreate({where:{id:3}, defaults: {username:'amilaa', password:'$2a$10$H9t.LIan8pFs1o8w.3jlL.vaOPUxxnMgV7nHrGmclWCec9AZ/Ta2i', Rola:'3'}});
    
});*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", express.static('public'));

const session = require("express-session");
app.use(session({
    secret: 'mojasifra',
    resave: true,
    saveUninitialized: true
 }));

app.post('/komentar',function(req,res){
    var podaci=req.body;
    var uredu=true;
    if (podaci.spirala.length<1) uredu=false;
    if (podaci.index.length<1) uredu=false;
    if (podaci.sadrzaj.constructor != Array) uredu=false;
    if (!(podaci.sadrzaj.length!=0 &&  podaci.sadrzaj[0].constructor==Object)) uredu=false;
    if (uredu){
        fs.appendFile('markS'+podaci.spirala.toString()+podaci.index.toString()+'.json', JSON.stringify(podaci), function(err){
            if (err) throw err;
            var object = {
                message: "Uspješno kreirana datoteka!",
                data: podaci
            };
            res.write(JSON.stringify(object));
            res.end();
        });
    }
    else{
        var object = {
            message: "Podaci nisu u traženom formatu!",
            data: null
        };
        res.write(JSON.stringify(object));
    }
}); 

app.post('/lista',function(req,res){
    podaci=req.body;
    var uredu=true;
    if (podaci.godina.length<1) uredu=false;
    if (podaci.nizRepozitorija.constructor != Array) uredu=false;
    if (podaci.nizRepozitorija.length<1) uredu=true;
    if (uredu){
        var niz="";
        for (var i=0;i<podaci.nizRepozitorija.length;i++)
        {
            if (podaci.nizRepozitorija[i].includes(podaci.godina)){
                var novi=podaci.nizRepozitorija[i].split("/");
                niz+='git@bitbucket.org:'+novi[3]+'/'+novi[4]+'\r\n';
            }
        }
        fs.appendFile('spisak'+podaci.godina.toString()+'.txt', niz , function(err){
            if (err) throw err;
            var redovi;
            var broj;
            fs.readFile('spisak'+podaci.godina.toString()+'.txt', function(err,data){
                if (err) throw err;
                var str = data.toString();
                redovi=str.split('\r\n');
                broj=redovi.length;
            });
            var object = {
                message: "Lista uspješno kreirana",
                data: broj
            };
            res.write(JSON.stringify(object));
            res.end();
        });
    }
    else{
        var object = {
            message: "Podaci nisu u traženom formatu!",
            data: null
        };
        res.write(JSON.stringify(object));
    }
}); 

app.post('/izvjestaj',function(req,res){
    var podaci=req.body;
    let upis="";
    fs.readFile('spisakS'+podaci.spirala+'.json', function(err,files){
        if (err) throw err;
        var spisak=files.toString();
        var json=JSON.parse(spisak);
        var niz=[];
        var str;
        for (var i=0;i<json.length;i++){
            str=json[i].toString().split(",");
            niz.push(str);
        }
        for(var i=0;i<niz.length;i++){
            for(let j=0;j<6;j++){
                if (niz[i][j]==podaci.index){
                    fs.readFile('markS'+podaci.spirala+niz[i][0]+".json", function(err,data){
                        if (err) throw err;
                        var marks=JSON.parse(data);
                        upis+=marks.sadrzaj[j-1].tekst+"\r\n";
                        upis+="##########"+"\r\n";
                        fs.appendFile('izvjestaj'+podaci.spirala.toString()+podaci.index.toString()+'.txt', upis , function(err){
                            if (err) throw err;
                            res.write("uspjesno");
                        });
                        upis="";
                    });
                }
            }
        }
        
    });
    
}); 

app.post('/bodovi',function(req,res){
    var podaci=req.body;
    var upis=0;
    var broj=0;
    var prosjek;
    fs.readFile('spisakS'+podaci.spirala+'.json', function(err,files){
        var ocjene=[];
        if (err) throw err;
        var spisak=files.toString();
        var json=JSON.parse(spisak);
        var niz=[];
        var nizElemenata=[];
        var elementi=[];
        var str;
        for (var i=0;i<json.length;i++){
            str=json[i].toString().split(",");
            niz.push(str);
        }
        for(let i=0;i<niz.length;i++){
            for(let j=0;j<6;j++){
                if (niz[i][j]==podaci.index){
                    elementi.push(i);
                    elementi.push(j);
                    nizElemenata.push(elementi);
                    elementi=[];
                }
            }
        }
    
        for (let i=0;i<nizElemenata.length;i++){
            fs.readFile('markS'+podaci.spirala+niz[nizElemenata[i][0]][0]+".json", function(err,data){
                if (err) throw err;
                var marks=JSON.parse(data);
                var br=parseInt(nizElemenata[i][1])-1;
                upis+=marks.sadrzaj[br].ocjena;
                broj++;
                if (i==nizElemenata.length-1){
                    var mjesto=Math.floor(upis/broj)+1;
                    var string='{"poruka":"Student '+podaci.index +' je ostvario u prosjeku '+ mjesto +' mjesto"}';
                    
                }
            });
        }
    });
}); 



app.get('/unosSpiska',function(req,res)
{
    if(req.session.permission === nastavnikPermission)
    res.sendFile(__dirname + '/public/unosSpiska.html');
     else
         res.send("Zao nam je, nemate mogucnost pristupa ovoj stranici");
});

app.post('/unosSpiska', function(req,res){
    var podaci=req.body;
    var indexi=podaci.indexi.toString();
    var nizInd=indexi.split('\r\n');
    var uredu=true;
    var sve="[";
    var greska;
    for(var i=0;i<nizInd.length;i++)
    {
        var nizZarez=nizInd[i].split(',');
        if (nizZarez.length!=6) {
            uredu=false;
            var br=parseInt(i)+1;
            greska="Red "+br+" nema 6 indeksa odvojenih zarezom.";
            break;
        }
        sve+="[";
        for (var j=0;j<nizZarez.length-1;j++)
        {
            for (var k=j+1;k<nizZarez.length;k++)
            {
                if (nizZarez[j]==nizZarez[k]) {
                    uredu=false;
                    var br=parseInt(j)+1;
                    greska="U redu "+br+" postoje dva ista indeksa.";
                    break;
                }
            }
        }

        for (var j=0;j<nizZarez.length;j++)
        {
            sve+='"'+nizZarez[j]+'"';
            if (j!=nizZarez.length-1) sve+=",";
        }
        sve+="]";
        if (i!=nizInd.length-1) sve+=",";

        if (podaci.spirala.toString()==""){
            uredu=false;
            greska="Nije upisan broj spirale.";
        }
    }
    sve+="]";
    if (uredu) {
        fs.appendFile('spisakS'+podaci.spirala.toString()+'.json', sve, function(err){
            if (err) throw err;
            res.end("Podaci uspjesno dodani.");
        });
    }
    else res.send(greska);
});


app.get('/nastavnik',function(req,res)
{
    console.log(req.session.permission+" /nastavnik");
    if(req.session.permission === nastavnikPermission)
    res.sendFile(__dirname + '/public/nastavnik.html');
     else
     res.send("Zao nam je, nemate mogucnost pristupa ovoj stranici.");
});


app.post("/login", function(req,res){
    var podaci=req.body;
    let username = podaci.username.replace('select','').replace('SELECT','').replace('<','').replace('>','');
    let password = podaci.password.replace('select','').replace('SELECT','').replace('<','').replace('>','');
    LoginKorisnik.findOne({where:{username: username}}).then(function(data){
        if (!data){
            res.send("Korisnicko ime ne postoji");
            res.end();
        }
        else{
            var kor=data.dataValues;
            bcrypt.compare(password, kor.password, function(err,pass){
                if (err) throw err;
                if (pass === true){
                    req.session.permission = kor.Rola;
                    console.log(req.session.permission);
                    if (kor.Rola=="1")
                        res.sendFile(__dirname+'/public/RolaNastavnik.html');
                    else if (kor.Rola=="2"){
                        res.sendFile(__dirname+'/public/RolaStudent.html');
                    }
                    else if (kor.Rola=="3")
                        res.sendFile(__dirname+'/public/RolaAdmin.html');
                    
                }
                else{
                    res.send("Password nije tacan.");
                }
            })
        }
    });
  
    
});

app.get('/statistika',function(req,res)
{
    if(req.session.permission === studentPermission)
        res.sendFile(__dirname + '/public/statistika.html');
    else
    res.send("Zao nam je, nemate mogucnost pristupa ovoj stranici");
});

app.get('/unosKomentara',function(req,res)
{
    if(req.session.permission == studentPermission)
        res.sendFile(__dirname + '/public/unosKomentara.html');
    else
        res.send("Zao nam je, nemate mogucnost pristupa ovoj stranici");
});


app.post('/registracija', function(req,res){
    var podaci=req.body;
    
    if (podaci['nimeiprezime']!=''){
        //provjeriti je li injection
        bcrypt.hash(req.body['npassword1'], saltRounds).then(function(hash){
            LicniPodaci.create({ime_prezime:podaci['nimeiprezime'].replace('SELECT','').replace('select','').replace('<','').replace('>',''), 
            akademska_godina:podaci['ntrenutnaakgodina'].replace('SELECT','').replace('select','').replace('<','').replace('>',''),
            fakultetski_mail:podaci['nfakultetskiemail'].replace('SELECT','').replace('select','').replace('<','').replace('>',''),
            trenutni_semestar:podaci['ntrenutnisemestar'].replace('SELECT','').replace('select','').replace('<','').replace('>',''),
            regex_za_validaciju:podaci['nregex'].replace('SELECT','').replace('select','').replace('<','').replace('>',''),
            maksimalan_broj_grupa:podaci['nmaxbrgrupa'].replace('SELECT','').replace('select','').replace('<','').replace('>',''),
            verified:false,
        }).then(function(novo){
            LoginKorisnik.create({
                username:req.body['nkorisnickoime'],
                password:hash,
                LicniPodaci:novo.id,
                Rola:1
            });
            res.send("Nastavnik uspjesno unesen.");
            }).catch(function(err){
                res.send(err+"<br><br> Podaci nisu uspjesno uneseni");
            });
        });
    }
    else if (podaci['simeiprezime']!=''){
        bcrypt.hash(req.body['spassword1'], saltRounds).then(function(hash){
            LicniPodaci.create({ime_prezime:podaci['simeiprezime'].replace('SELECT','').replace('select','').replace('<','').replace('>',''),
            broj_indexa:podaci['sindeks'].replace('SELECT','').replace('select','').replace('<','').replace('>',''),
            grupa:podaci['sbrojgrupe'].replace('SELECT','').replace('select','').replace('<','').replace('>',''),
            akademska_godina:podaci['sakgod'].replace('SELECT','').replace('select','').replace('<','').replace('>',''),
            bitbucket_url:podaci['sbitbucketurl'].replace('SELECT','').replace('select','').replace('<','').replace('>',''),
            bitbucket_ssh:podaci['sbitbucketssh'].replace('SELECT','').replace('select','').replace('<','').replace('>',''),
            naziv_repozitorija:podaci['snazivrepozitorija'].replace('SELECT','').replace('select','').replace('<','').replace('>',''),
            varified:null,
        }).then(function(novo){
            LoginKorisnik.create({
                username:podaci['simeiprezime'],
                password:hash,
                LicniPodaci:novo.id,
                Rola:2
            });
            res.send("Student uspjesno unesen.");
        }).catch(function(err){
            res.send(err);
        });
        });
    }
    
});
        
app.get('/listaKorisnika',function(req,res)
{
    if(req.session.permission == adminPermission){
       // res.sendFile(__dirname + '/public/listaKorisnika.html');
        LicniPodaci.findAll({
            include: [LoginKorisnik],
            }).then(function(rez){
                var tekst='';
                var redovi=[];
                for(var i=0;i<rez.length;i++){
                    var elem=rez[i].dataValues;
                    var red='<tr>';
                    red+='<td>'+elem.ime_prezime+'</td>';
                    if (elem.verified==false){
                        red+='<td><button onClick="verifikacija('+elem.id+')>Verify</button></td>';
                    }
                    else if (elem.verified==true){
                        red+='<td><button onClick="odverifikacija('+elem.id+')>Unverify</button></td>';    
                    }
                    red+='</tr>';
                    redovi.push(red);
                }
                tekst+='<br><br><br>'
                tekst+='<input id="unos">';
                tekst+='<button onClick="pretrazi()">Pretrazi</button>';
                tekst+='<table>';
                for (var i=0;i<redovi.length;i++){
                    tekst+=redovi[i];
                }
                tekst+='</table>';
                res.send(tekst);
                res.end;
            })
        
    }
    else
        res.send("Zao nam je, nemate mogucnost pristupa ovoj stranici");
});

app.get('/odjaviSe', function(req,res){
    req.session.permission=0;
    res.sendFile(__dirname + '/public/login.html');
})



app.listen(3000);
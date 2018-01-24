var BitbucketApi= (function(){
    var tokenn;
    var imaBranch;
    return{
    dohvatiAccessToken: function(key, secret, fnCallback){
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200){
                tokenn=JSON.parse(ajax.responseText).access_token;
                fnCallback(null,tokenn);
            }
            else if (ajax.readyState == 4)
                fnCallback(ajax.status,null);
            else if (key==null || secret==null)
                fnCallback(-1, "Key ili secret nisu pravilno proslijeđeni");
        }
        ajax.open("POST", "https://bitbucket.org/site/oauth2/access_token", true);
        ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        ajax.setRequestHeader("Authorization", 'Basic ' + btoa(key+":"+secret));
        ajax.send("grant_type="+encodeURIComponent("client_credentials"));
    },
    dohvatiRepozitorije: function(token, godina, naziv, branch, fnCallback){
        token=tokenn;
        var nizBranch=[];
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function(){
            if (ajax.readyState==4 && ajax.status==200){
                var podaci = JSON.parse(ajax.responseText);
                var nova = [];
                for (var i=0;i<podaci.values.length;i++)
                {
                    if(podaci.values[i].full_name.includes(naziv))
                    {
                        var god=podaci.values[i].created_on.substring(0,4);
                        if (god==godina || parseInt(godina)+1==parseInt(god)) 
                        {
                            var full=podaci.values[i].full_name;
                            nova.push("git@bitbucket.org:"+full+"git");
                            nizBranch.push(podaci.values[i].links.branches.href);
                        }
                    }
                }
                var br=0;
                for (let i=0;i<nizBranch.length;i++){
                    BitbucketApi.dohvatiBranch(tokenn, nizBranch[br], branch, function(err,data){
                        br++;
                        if (!data){
                            nova.splice(i,1);
                            i--;
                        }
                        if (br==nizBranch.length-1) {
                            fnCallback(null, nova);
                            
                        }
                    });
                }
            }
            else if (ajax.readyState==4) 
                fnCallback(ajax.status, null);
        }
        ajax.open("GET","https://api.bitbucket.org/2.0/repositories?role=member");
        ajax.setRequestHeader("Authorization", 'Bearer '+ token);
        ajax.send();
    },
    dohvatiBranch: function(token, url, naziv, fnCallback){
        token=tokenn;
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function(){
            if (ajax.readyState==4 && ajax.status==200){
                var podaci = JSON.parse(ajax.responseText);
                var ima=false;
                for (var i=0;i<podaci.values.length;i++)
                {
                    if(podaci.values[i].name==naziv) ima=true;
                }
                if (ima) fnCallback(null,true);
                else fnCallback(null,false);  
            }
            else if (ajax.readyState==4) 
                fnCallback(ajax.status, null);
        }
        ajax.open("GET",url);
        ajax.setRequestHeader("Authorization", 'Bearer '+ token);
        ajax.send();
    }
}

})();

BitbucketApi.dohvatiAccessToken("RaeEdppZNMKt2SZn6u", "fZVdnqukuJYkYRcunNNTN8vSu8kD5bt2", function(){});

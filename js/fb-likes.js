 window.fbAsyncInit = function() {
    FB.init({
      appId      : '342183615957574', // Set YOUR APP ID
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
    });
      FB.Event.subscribe('auth.login', function(response) {
                    // do something with response
                  
                });
                FB.Event.subscribe('auth.logout', function(response) {
                    // do something with response
                   Logout();
                });
 FB.getLoginStatus(function(response) {
                  if(response.status === 'connected')
                  {                        // logged in and connected user, someone you know
                       getUserLikes();
                    }
                });
    };
 
 
  function getUserInfo() {
        FB.api('/me', function(response) {
 
      var str="<b>Name</b> : "+response.name+"<br>";
          str +="<b>Link: </b>"+response.link+"<br>";
          str +="<b>Username:</b> "+response.username+"<br>";
          str +="<b>id: </b>"+response.id+"<br>";
          str +="<b>Email:</b> "+response.email+"<br>";
          str +="<input type='button' value='Get Photo' onclick='getPhoto();'/>";
          str +="<input type='button' value='Logout' onclick='Logout();'/>";
          document.getElementById("status").innerHTML=str;
 
    });
    }
function getUserLikes() {
        FB.api('/me/likes?limit=200', function(response) {
  
        var data = response.data;
            map = {};
            var count =0;
           
            
            for(var i in data)
            {
                var category = data[i].category;
                var name = data[i].name;
              
                if(category in map)
                {
                    map[category].push(name);
                    count+=1;
                }
                    
                else
                    map[category] = [name];
                    
              
 
            }
        
        printData(map);
        
    });
        
    }
function sortData(map,count)
{
    
    for (var i=0;i<count;i++)
    {
        
        n1 = map[i];
         console.log(n1.length);
        for(var j=i+1;j<count-i;j++)
        {
            n2 = map[j];
            if(n1.length < n2.length)
            {
                var temp = map[i];
                map[i] = map[j];
                map[j] = temp;
            }
        }
    }
    return map;
}
function printData(map)
{
   
    var d = new Array();
    
     for (var key in map)
          {
            document.getElementById("likes").innerHTML+="<br/><b>"+key+"</b><br/>";
            names = map[key];
            names.length
            d["x:"] = key;
            d["y:"] = names.length;
            
            document.getElementById("likes").innerHTML+="<br/><b>"+names.length+"</b><br/>";
              for(var n in names)
              {
               document.getElementById("likes").innerHTML+="<br/>"+map[key][n]+"<br/>";
              }
          }
 var data = {
  "xScale": "ordinal",
  "yScale": "linear",
  "type": "bar",
  "main": [{
  "classname": ".statistico",
    "data":[d]
      
  }
]
    }
 alert(String(data));
}

    function getPhoto()
    {
      FB.api('/me/picture?type=normal', function(response) {
 
          var str="<br/><b>Pic</b> : <img src='"+response.data.url+"'/>";
          document.getElementById("status").innerHTML+=str;
 
    });
 
    }
    function Logout()
    {
        FB.logout(function(){document.location.reload();});
    }
 
   // Load the SDK asynchronously
  (function(d){
     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "//connect.facebook.net/en_US/all.js";
     ref.parentNode.insertBefore(js, ref);
   }(document));
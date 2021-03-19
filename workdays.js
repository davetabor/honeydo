var closeModal = function () {
    document.getElementById('id01').style.display='none';
    setCookie("valid",true,7);
}

var setCookie = function (cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

 var getCookie = function(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  var deleteCookie = function() {
    document.cookie = "valid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  var getProjects = function () {
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("projects").innerHTML = xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET", "workdays.php", true);
    xmlhttp.send();
    window.scrollTo(0, 0);
}

var checkForModal = function () {
    var resp = getCookie("valid");
    if (resp !== "true"){
        document.getElementById('id01').style.display = 'block';
    }
    return resp;
}


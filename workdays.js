var jsonData = "";
var counter = 0;

var getProjects = function () {
  $.ajax({
    url: 'https://stellafane.org/stm_members/workdays/php/getProjects.php',
    type: 'GET',
    success: function (data) {
      jsonData = data;
      jsonData = JSON.parse(jsonData);
      buildTasks(jsonData);
    },
    error: function (e) {
      console.log(e.message);
    }
  });
}

var buildTasks = function (jsonData) {

  for (var j = 0; j < jsonData.length; j++) {
    counter++;
    var guts = jsonData[j];
    if (guts.task != "" && guts.task != null) {
      console.log("j=" + j + ": ");
      console.log(guts);
      var task = guts.task;
      var dept = guts.dept;
      console.log(dept);
      var description = guts.description;
      var leader = guts.leader;
      var goalDate = guts.goalDate;
      var members = guts.members;
      var taskBox = document.getElementById(dept);

      var newTask = document.createElement('div');
      newTask.id = "task" + counter;
      newTask.classList.add("collapsible");
      newTask.classList.add("tdTaskName");
      newTask.onclick = 'document.getElementById("taskContent").style.maxHeight = "100%"';
      var innerTxt = '<span class="bottomLeftText">' + task + '</span> <span class="bottomRightText" style=\"font-size: .6em;\">[more]</span>';
      newTask.innerHTML = innerTxt;

      taskBox.appendChild(newTask);

      var newContent = document.createElement('div');
      newContent.classList.add("content");
      newContent.id = "taskContent" + counter;
      innerTxt = '<table style=\"border: 0; font-size: .75em\">';
      innerTxt = innerTxt + '<tr>';
      innerTxt = innerTxt + '<th>Description</th>';
      innerTxt = innerTxt + '<td>' + description + '</td>';
      innerTxt = innerTxt + '</tr><tr>';
      innerTxt = innerTxt + '<th>Intensity</th>';
      innerTxt = innerTxt + '<td>--</td>';
      innerTxt = innerTxt + '</tr><tr>';
      innerTxt = innerTxt + '<th>Members Needed</th>';
      innerTxt = innerTxt + '<td>' + members + '</td>';
      innerTxt = innerTxt + '</tr><tr>';
      innerTxt = innerTxt + '<th>Completion Date</th>';
      innerTxt = innerTxt + '<td>' + goalDate + '</td>';
      innerTxt = innerTxt + '</tr><tr>';
      innerTxt = innerTxt + '<th>Team Lead</th>';
      innerTxt = innerTxt + '<td>' + leader + '</td>';
      innerTxt = innerTxt + '</tr><tr>';
      innerTxt = innerTxt + '<th>Volunteers</th>';
      innerTxt = innerTxt + '<td><ul>';
      if (guts.workers != null && guts.workers != []) {
        for (var m = 0; m < guts.workers.length; m++) {
          innerTxt = innerTxt + '<li>' + guts.workers[m] + ' <input type=\"button\" onclick=\"removeMe(' + task + ', ' + guts.workers[m] + ');\" value="X"></li>';
          // innerTxt = innerTxt + '<li>' + guts.workers[m] + ' <input type=\"button\" onclick=\"removeMe("duh","yup");\" value="X"></li>';
        }
      }
      var textID = "name" + j;
      innerTxt = innerTxt + '<li><input type=\"text\" id=\"' + textID + '\" placeholder=\"Your Name\"><input type=\"button\" onclick=\'addMe(\"' + task + '\", \"' + textID + '\");\' value=\"Go\"></li>';
      // innerTxt = innerTxt + '<li><input type=\"text\" id=\"' + textID + '\" placeholder=\"Your Name\"><input type=\"button\" onclick=\'addMe("huh","yup").val())\' value=\"Go\"></li>';
      innerTxt = innerTxt + '</ul></td></tr></table></div>';
      newContent.innerHTML = innerTxt;
      // taskBox.appendChild(newTask);
      taskBox.appendChild(newContent);
    }
  }
  addListeners();
}

var addTasks = function () {
  $(function () {
    var dialog = $("#dialog-form");
    var task = $("#task").val();
    var desc = $("#desc").val();
    var goal = $("#goalDate").val();
    var leader = $("#leader").val();
    var loc = $("#location").val();
    if (loc == "" || loc == null) {
      loc = "other";
    }
    var members = $("#members").val();
    $("#dialog-form").dialog("close");
    appendTask(task, desc, goal, leader, loc, members);
  });
}

var addMe = function (task, textID) {
  var name = $("#" + textID).val();
  if (name != "" && name != null) {
    for (var j = 0; j < jsonData.length; j++) {
      guts = jsonData[j];
      if (guts.task == task) {
        if (guts.workers == null) {
          guts.workers = [];
          guts.workers[0] = name;
        } else {
          var ctr = guts.workers.length;
          guts.workers[ctr] = name;
        }
      }
    }
    alert(JSON.stringify(jsonData));
    saveJSON();
  }
}

var appendTask = function (task, desc, goal, leader, loc, members) {
  console.log("||| INPUTS: " + task + " - " + desc + " - " + goal + " - " + leader + " - " + loc + " - " + members + "||||");
  var newData = {
    "task": task,
    "description": desc,
    "dept": loc,
    "leader": leader,
    "goalDate": goal,
    "members": members
  };
  console.log("newData: ");
  console.log(newData);
  console.log("jsonData: ")
  jsonData.push(newData);
  saveJSON();
}

function saveJSON() {
  $.ajax({
    type: "POST",
    url: "saveJSON.php",
    data: { "jsonDTA": jsonData },
    success: function (result) {
      console.log(result);
      location.reload();
    },
    error: function (xhr, status, error) { alert("This didn't work: " + error); }
  });
}

var getLocation = function (loc) {
  switch (loc) {
    case "site":
      location = 'Site';
      break;
    case "clubhouse":
      location = "Clubhouse";
      break;
    case "porter":
      location = 'Porter Turret';
      break;
    case "simoni":
      location = 'Simoni Observatory';
      break;
    case "m44":
      location = 'M44';
      break;
    case "mcgregor":
      location = 'McGregor Observatory';
      break;
    case "breuning":
      location = 'Breuning Observatory';
      break;
    case "bunkhouse":
      location = 'Bunkhouse';
      break;
    case "tuthill":
      location = 'Tuthill Towers';
      break;
    case "fruit":
      location = 'Fruit Stand';
      break;
    case "fuel":
      location = 'Fuel Shed';
      break;
    case "amphitheater":
      location = 'Amphitheater';
      break;
    default:
      location = "Other";
  }
  return location;
}

// Listeners
var addListeners = function () {
  console.log("addListeners Start");
  var coll = document.getElementsByClassName("collapsible");
  var i;

  for (i = 0; i < coll.length; i++) {
    console.log(coll[i]);
    coll[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  }
}

// Modals
var closeModal = function () {
  document.getElementById('id01').style.display = 'none';
  setCookie("valid", true, 7);
}
var checkForModal = function () {
  var resp = getCookie("valid");
  if (resp !== "true") {
    document.getElementById('id01').style.display = 'block';
  }
  return resp;
}

// Handle Cookies
var setCookie = function (cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
var getCookie = function (cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
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
var deleteCookie = function () {
  document.cookie = "valid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// getProjects()
// Get Projects and Build Screen
// var getProjects = function () {
//   if (window.XMLHttpRequest) {
//     xmlhttp = new XMLHttpRequest();
//   } else {
//     xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
//   }
//   xmlhttp.onreadystatechange = function () {
//     if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//       document.getElementById("projects").innerHTML = xmlhttp.responseText;
//     }
//   }
//   xmlhttp.open("GET", "workdays.php", true);
//   xmlhttp.send();
//   window.scrollTo(0, 0);
// }
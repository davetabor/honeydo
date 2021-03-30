var jsonData = "";
var counter = 0;


var checkForDeletions = function (myCallback) {
  var params = new URLSearchParams(location.search);
  var delItem = params.get('delete');
  // alert("delItem read: " + delItem);
  if (delItem != null && delItem != "") {
    console.log("delItem: " + delItem);
    var d = parseInt(delItem);
    console.log("delItem: " + d);
    alert("delItem: " + d);
    // alert(jsonData[delItem].task);
    jsonData.splice(d,1);
    // alert(jsonData[delItem].task);
    alert(jsonData);

    myCallback();
  }
}
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
      console.log("guts.complete: " + guts.complete);
      var complete = guts.complete;
      var taskBox = document.getElementById(dept);

      var newTask = document.createElement('div');
      newTask.id = "task" + counter;
      newTask.classList.add("collapsible");
      newTask.classList.add("tdTaskName");
      console.log("complete: " + complete);
      if (complete == "true") {
        newTask.classList.add("complete")
      };
      newTask.onclick = 'document.getElementById("taskContent").style.maxHeight = "100%"';
      var innerTxt = "";
      if (complete == "true") {
        innerTxt = innerTxt + "<h4 id=\"complete\">COMPLETE</h4>";
        innerTxt = innerTxt + '<div class="bottomLeftText completeTaskName">'
      } else {
        innerTxt = '<div class="bottomLeftText">'
      }
      innerTxt = innerTxt + task + '</div> <div class="bottomRightText" style=\"font-size: .6em;\">more</div';
      newTask.innerHTML = innerTxt;

      taskBox.appendChild(newTask);

      var newContent = document.createElement('div');
      newContent.classList.add("content");
      innerTxt = "";
      if (complete == "true") {
        innerTxt = innerTxt + "<h4 style=\"color: red;\">COMPLETE</h4>";
      };
      newContent.id = "taskContent" + counter;
      innerTxt = innerTxt + '<table style=\"border: 0; font-size: .75em\">';
      innerTxt = innerTxt + '<tr>';
      innerTxt = innerTxt + '<th>Description</th>';
      innerTxt = innerTxt + '<td>' + description + '</td>';
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
          innerTxt = innerTxt + '<li>' + guts.workers[m] + ' <button onclick=\'removeMe(\"' + task + '\", \"' + guts.workers[m] + '\");\'>X</button></li>';
        }
      }
      var textID = "name" + j;
      innerTxt = innerTxt + '<li><input type=\"text\" id=\"' + textID + '\" placeholder=\"Your Name\"><input type=\"button\" onclick=\'addMe(\"' + task + '\", \"' + textID + '\");\' value=\"Go\"></li>';
      innerTxt = innerTxt + '</ul></td></tr></table>';
      innerTxt = innerTxt + '<div style=\"text-align: right; font-size: 10px;\">';
      innerTxt = innerTxt + '<button onclick=\'markComplete(\"' + task + '\")\' class=\"bottomRightText\" style=\"font-size: .65em; font-weight: bold; padding: 0;\">';
      if (complete == "true") {
        innerTxt = innerTxt + 'Mark Active'
      } else {
        innerTxt = innerTxt + 'Mark Complete'
      }
      innerTxt = innerTxt + '</button>';
      innerTxt = innerTxt + '<button class="deletes" onclick = \'deleteTask(' + j + '); return false;\'>Delete (Get Permission First)</button>'
      innerTxt = innerTxt + '<button class="deletes" onclick="turnOffDeletes(); return false;">Cancel</button>'
      innerTxt = innerTxt + j + '</div>';
      newContent.innerHTML = innerTxt;

      taskBox.appendChild(newContent);
    }
  }
  addListeners();
}

var deleteTask = function (taskNo) {
  jsonData.splice(taskNo,1);
  saveJSON();
}

var turnOnDeletes = function () {
  $(".deletes").css("display","block");
}
var turnOffDeletes = function () {
  $(".deletes").css("display","none");
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
  alert("task: " + task + ", textID: " + textID + ", name: " + name);
  if (name != "" && name != null) {
    for (var j = 0; j < jsonData.length; j++) {
      guts = jsonData[j];
      if (guts.task == task) {
        if (guts.workers == null || guts.workers == "") {
          guts.workers = [];
          guts.workers[0] = name;
        } else {
          var ctr = guts.workers.length;
          guts.workers[ctr] = name;
        }
      }
    }
    saveJSON();
  }
}

var markComplete = function (task) {
  if (task != "" && task != null) {
    for (var j = 0; j < jsonData.length; j++) {
      guts = jsonData[j];
      if (guts.task == task) {
        if (guts.complete == null || guts.complete == "false") {
          guts.complete = true;
        } else {
          guts.complete = false;
        }
      }
    }
    saveJSON();
  }
}

var removeMe = function (task, name) {
  console.log("removeMe Started... " + task + ", " + name);
  // var name = $("#" + textID).val();
  if (name != "" && name != null) {
    for (var j = 0; j < jsonData.length; j++) {
      guts = jsonData[j];
      console.log("trying record" + j);
      if (guts.task == task) {
        console.log("Record detected...");
        for (var w = 0; w < guts.workers.length; w++) {
          if (guts.workers[w] == name) {
            delete guts.workers[w];
            console.log("Found It!!");
            saveJSON();
          }
        }
      }
    }
  }
}

var appendTask = function (task, desc, goal, leader, loc, members) {
  console.log("--- INPUTS: " + task + " - " + desc + " - " + goal + " - " + leader + " - " + loc + " - " + members + " ---");
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

var saveJSON = function () {
  $.ajax({
    type: "POST",
    url: "saveJSON.php",
    data: {
      "jsonDTA": jsonData
    },
    success: function (result) {
      console.log(result);
      var url = window.location.href;
      url = url.split('?')[0];
      window.location = url;
    },
    error: function (xhr, status, error) {
      alert("This didn't work: " + error);
    }
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
    // console.log(coll[i]);
    coll[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        // content.style.maxHeight = content.scrollHeight + "px";
        content.style.maxHeight = "100%";
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

$(function () {
  var dialog, form,

    emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    site = $("#site"),
    task = $("#task"),
    desc = $("#desc"),
    goalDate = $("#goalDate"),
    leader = $("#leader"),
    members = $("#members");

  function updateTips(t) {
    tips
      .text(t)
      .addClass("ui-state-highlight");
    setTimeout(function () {
      tips.removeClass("ui-state-highlight", 1500);
    }, 500);
  }

  function checkLength(o, n, min, max) {
    if (o.val().length > max || o.val().length < min) {
      o.addClass("ui-state-error");
      // updateTips("Length of " + n + " must be between " +
      // min + " and " + max + ".");
      return false;
    } else {
      return true;
    }
  }

  function checkRegexp(o, regexp, n) {
    if (!(regexp.test(o.val()))) {
      o.addClass("ui-state-error");
      return false;
    } else {
      return true;
    }
  }

  function addUser() {
    var valid = true;
    dialog.dialog("close");
    return valid;
  }

  dialog = $("#dialog-form").dialog({
    autoOpen: false,
    height: 600,
    width: 350,
    modal: true,
    buttons: {
      "Add Task": addTasks,
      Cancel: function () {
        dialog.dialog("close");
      }
    },
    close: function () {
      form[0].reset();
    }
  });

  form = dialog.find("form").on("submit", function (event) {
    event.preventDefault();
    addUser();
  });

  $("#create-user").button().on("click", function () {
    dialog.dialog("open");
  });
});


checkForDeletions(saveJSON);
// Saves options to localStorage.
function save_options(o) {
	localStorage["favorite_beauty"] = o;
  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "修改已保存，您选择的是"+o;
  setTimeout(function() {
    status.innerHTML = "";
  }, 2000);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  var favorite = localStorage["favorite_beauty"];
  if (!favorite) {
    return;
  }
  var select = document.getElementsByName("beauty");
  for (var i = 0; i < select.length; i++) {
    var child = select[i];
    if (child.value == favorite) {
      child.checked = true;
      break;
    }
  }
}
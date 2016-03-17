
//Checking localStorage support
function CheckBrowser() {
    if ('localStorage' in window && window['localStorage'] !== null) {
    return true;
} else {
    return false;
}
}

//Generate one list element
function generateItem(item){
    var newLi = document.createElement('li');
    newLi.id = item;
    var newLiCheckBox = document.createElement('input');
    newLiCheckBox.type = 'checkbox';
    newLiCheckBox.value = item;
    newLiCheckBox.checked = JSON.parse(localStorage.getItem(item)).status;
    newLiCheckBox.onchange=function(){
        var id = this.value;
        var selector = '#' + id + ' p';
        var ell = JSON.parse(localStorage.getItem(id));
        if (ell.status == false) {
            ell.status = true;
            document.querySelector(selector).className = 'done';
        } else {
            ell.status = false;
            document.querySelector(selector).removeAttribute("class");
        }
        localStorage.setItem(id, JSON.stringify(ell));
    };
    var newLiText = document.createElement('p');
    newLiText.innerHTML = JSON.parse(localStorage.getItem(item)).text;
    if (JSON.parse(localStorage.getItem(item)).status == true) {
        newLiText.className = 'done';
    }
    document.getElementById('list').appendChild(newLi);
    document.getElementById(item).appendChild(newLiCheckBox);
    document.getElementById(item).appendChild(newLiText)
}

//Generate all elements on page load if they exist
function doShowAll() {
    if (CheckBrowser()) {
        if (checkToDo() > 0) {
            for (var i = 0; i < checkToDo(); i++) {
                var gKey = 'toDo' + i;
                generateItem(gKey);
            }
        }
    } else {
        alert('Your browser do not support local storage');
    }
}

//Calculate records count
function checkToDo (){
    var toDoCount = 0;
   for (var key in localStorage) {
       if (key.indexOf("toDo") !== -1) {
           toDoCount++;
       };
   };
    return toDoCount;
}

//Adding new element to localStorage and list
function doAdd () {
    var newDoText = document.getElementById('taskInput').value;
    var newDoStatus = 0;
    var newDo = {text : newDoText, status: newDoStatus};
    var doCount = checkToDo();
    var index = 'toDo'+ doCount;
    localStorage.setItem(index, JSON.stringify(newDo));
    generateItem(index);
}

function filterInprogress() {
    for (var i = 0; i < checkToDo(); i++) {
        var gKey = 'toDo' + i;
        if ((JSON.parse(localStorage.getItem(gKey)).status == true)) {
            document.getElementById(gKey).className = 'hiden';
        } else {
            document.getElementById(gKey).removeAttribute("class");
        }
    }
}

function filterDone() {
    for (var i = 0; i < checkToDo(); i++) {
        var gKey = 'toDo' + i;
        if ((JSON.parse(localStorage.getItem(gKey)).status == false)) {
            document.getElementById(gKey).className = 'hiden';
        } else {
            document.getElementById(gKey).removeAttribute("class");
        }
    }
}

function filterAll() {
    for (var i = 0; i < checkToDo(); i++) {
        var gKey = 'toDo' + i;
          document.getElementById(gKey).removeAttribute("class");
    }
}



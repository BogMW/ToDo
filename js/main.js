
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


document.getElementById('filterInprogress').addEventListener('click', function() {
    document.getElementById('filterInprogress').className = 'bold';
    document.getElementById('filterDone').removeAttribute("class");
    document.getElementById('filterAll').removeAttribute("class");
    document.getElementById('clearDone').style.display = 'none';
    for (var i = 0; i < checkToDo(); i++) {
        var gKey = 'toDo' + i;
        if ((JSON.parse(localStorage.getItem(gKey)).status == true)) {
            document.getElementById(gKey).className = 'hiden';
        } else {
            document.getElementById(gKey).removeAttribute("class");
        }
    }
}, false);

document.getElementById('filterDone').addEventListener('click', function() {
    document.getElementById('filterDone').className = 'bold';
    document.getElementById('filterInprogress').removeAttribute("class");
    document.getElementById('filterAll').removeAttribute("class");
    document.getElementById('clearDone').style.display = 'block';
    for (var i = 0; i < checkToDo(); i++) {
        var gKey = 'toDo' + i;
        if ((JSON.parse(localStorage.getItem(gKey)).status == false)) {
            document.getElementById(gKey).className = 'hiden';
        } else {
            document.getElementById(gKey).removeAttribute("class");
        }
    }
}, false);

document.getElementById('filterAll').addEventListener('click', function() {
    document.getElementById('filterAll').className = 'bold';
    document.getElementById('filterDone').removeAttribute("class");
    document.getElementById('filterInprogress').removeAttribute("class");
    document.getElementById('clearDone').style.display = 'none';
    for (var i = 0; i < checkToDo(); i++) {
        var gKey = 'toDo' + i;
        document.getElementById(gKey).removeAttribute("class");
    }
}, false);

document.getElementById('clearDone').addEventListener('click', function() {
    var newLS = {};
    var counter = 0;
    for (var i = 0; i < checkToDo(); i++) {
        var gKey = 'toDo' + i;
        if ((JSON.parse(localStorage.getItem(gKey)).status == false)) {
            var newKey = 'toDo' + counter;
            newLS[newKey] = localStorage.getItem(gKey);
            counter += 1;
        }
    }
    localStorage.clear();
    for (var key in newLS) {
       localStorage.setItem(key, newLS[key]);
    };
    document.getElementById('list').innerHTML = '';
    document.getElementById('filterAll').click();
    doShowAll();
}, false);


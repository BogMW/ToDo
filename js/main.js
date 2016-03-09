function CheckBrowser() {
    if ('localStorage' in window && window['localStorage'] !== null) {
    return true;
} else {
    return false;
}
}

function generateItem(item){
    var newLi = document.createElement('li');
    newLi.innerHTML = JSON.parse(localStorage.getItem(item)).text;
    document.getElementById('list').appendChild(newLi)
}

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

function checkToDo (){
    var toDoCount = 0;
   for (var key in localStorage) {
       if (key.indexOf("toDo") !== -1) {
           toDoCount++;
       };
   };
    return toDoCount;
}

function doAdd () {
    var newDoText = document.getElementById('taskInput').value;
    var newDoStatus = 'false';
    var newDo = {text : newDoText, status: newDoStatus};
    var doCount = checkToDo();
    var index = 'toDo'+ doCount;
    localStorage.setItem(index, JSON.stringify(newDo));
    generateItem(index);
}
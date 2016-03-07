function CheckBrowser() {
    if ('localStorage' in window && window['localStorage'] !== null) {
        return true;
    } else {
        return false;
    }
}

function generateItem(item){
    var newLi = document.createElement('li');
    newLi.innerHTML = localStorage[item];
    document.body.appendChild(newLi);
}

function doShowAll() {
    if (CheckBrowser()) {
        for (var i = 0; i < localStorage.length; i++) {
            generateItem(i);
        }
    } else {
        alert('Your browser do not support local storage');
    }
}

function doAdd () {
    var newDo = document.getElementById('taskInput').value;
    var index = localStorage.length;
    localStorage[index] = newDo;
    generateItem(index);
}
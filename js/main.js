function CheckBrowser() {
    if ('localStorage' in window && window['localStorage'] !== null) {
    return true;
} else {
    return false;
}
}

function generateItem(item){
    var newLi = document.createElement('li');
    newLi.innerHTML = JSON.parse(localStorage[item]).text;
    document.getElementById('list').appendChild(newLi)
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
    var newDoText = document.getElementById('taskInput').value;
    var newDoStatus = 'false';
    var newDo = {text : newDoText, status: newDoStatus};
    var index = localStorage.length;
    localStorage[index] = JSON.stringify(newDo);
    generateItem(index);
}
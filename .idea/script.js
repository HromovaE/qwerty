'use strict'
function changeBgColor() {
    var input=document.getElementById('bgcolor');
    document.body.getElementsByClassName('main')[0].style.backgroundColor=input.value;
}

function changeFontFamily(font) {
    var elements=document.body.getElementsByTagName('p');
    for (var i=0; i<elements.length; i++) {
        elements[i].style.fontFamily=font.value;
    }
}

function changeFontSize(size) {
    if (isNaN(size.value)) {
        alert('Введите пожалуйста число от 8 до 24!');
        return;
    }
    var rounded=Math.round(size.value);
    if ((rounded>=8) && (rounded<=24)) {
        var elements=document.body.getElementsByTagName('p');
        for (var i=0; i<elements.length; i++) {
            elements[i].style.fontSize = rounded+'px';
        }
    }
    else alert ("Диапазон возможных шрифтов от 8 до 24!");
}

function deleteLastP() {
    var elements=document.body.getElementsByTagName('p');
    for (var i=elements.length-1; i>=0; i--) {
        if (elements[i].style.display!='none') {
            elements[i].style.display='none';
            break;
        }
    }
}

function hideSidebar() {
    var sidebar=document.getElementById('sidebar');
    var main=document.getElementsByClassName('main')[0];
    if (sidebar.style.display!='none') {
        sidebar.style.display='none';
        main.style.width='100%';
        document.getElementById('burger').value='show >>';
    }
    else {
        main.style.width='77%';
        sidebar.style.display='block';
        document.getElementById('burger').value='<< hide';
    }
}
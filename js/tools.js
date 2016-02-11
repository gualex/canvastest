window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
    alert(errorMsg);
};

function numericCompareDesc(a, b) {
    return b - a;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
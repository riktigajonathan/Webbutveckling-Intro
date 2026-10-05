let width = window.innerWidth;
let height = window.innerHeight;

function setup() {
    document.getElementsByTagName("BODY")[0].onresize = function() {fixResize()};
    createCanvas(width, height);
    setTimeout(0);
}

function draw() {

}

function fixResize() {
    width = window.innerWidth;
    height = window.innerHeight;

    resizeCanvas(width, height);
}
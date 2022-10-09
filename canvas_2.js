

function setup() {
    let canvas = createCanvas(500, 500);
    canvas.id("canvas2");
    canvas.parent("id2");
    canvas.position(500, 500);
}

function draw() {
    background(128);
    line(250, 250, 50, 550);
}
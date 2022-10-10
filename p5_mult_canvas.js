//const { Body } = require("types/matter-js");

let capture; let img; let slider; var x; var y; var w; var h; var color;
/**To boost performance disable friendly errors */
p5.disableFriendlyErrors = true;
/**Empty expression for default math function parsing */
let expression = "";

/** Classed and function follow */
function parseFunc() {
  /**Update expression value to entered math function */
  expression = document.getElementById("input_button").value;
}

/**Matter.js aliases */
//module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;







var sketch1 = function (sketch_old) {
  sketch_old.setup = function () {
    /**Create a canvas that is in the div with id1 */
    var canvas1 = sketch_old.createCanvas(500, 500, sketch_old.WEBGL);
    canvas1.id("canvas1");
    canvas1.parent("id1");

    /**Add text to drag mouse */
    dragtext = sketch_old.createSpan("Drag mouse to rotate");
    dragtext.position(canvas1.width / 3, canvas1.height / 4);
    dragtext.style("color: white");

    /**Add slider for changing size of box */
    slider_size = sketch_old.createSlider(0, 100, 80, 0);
    slider_size.position(canvas1.width / 6, canvas1.height * 1.1);

    /**Add text to slider */
    slider_size_text = sketch_old.createSpan("Change box size");
    slider_size_text.position(canvas1.width / 6, canvas1.height * 1.1 - 25);
    slider_size_text.style("color: white");

    /**Add slider for changing grid of 3D graph */
    slider_dense = sketch_old.createSlider(5, 20, 14, 1);
    slider_dense.position(canvas1.width / (6/3), canvas1.height * 1.1);
    
    /**Add text to slider */
    slider_dense_text = sketch_old.createSpan("Change density of graph lines");
    slider_dense_text.position(canvas1.width / (6/3), canvas1.height * 1.1 - 25);
    slider_dense_text.style("color: white");

    
    /**Testing some headers */
    var h1 = sketch_old.createElement("h1", "this is a header");
    h1.position(0, 0, "relative");
    let paragraph = sketch_old.createElement("p", "This is a paragraph");
    paragraph.id("parag1");
  }
  
  sketch_old.draw = function () {
    sketch_old.background(100);

    /**Draw loop with a slider value for box size nad mouseX/Y coords for rotations */
    /**col variable controls the slider value for box size and density*/
    let col = slider_size.value();
    let dense = slider_dense.value();

    /**Mouse variables to check */
    var Mx = sketch_old.mouseX;
    var My = sketch_old.mouseY;

    /**If mouse is pressed in canvas then rotate */
    if (sketch_old.mouseIsPressed) {    
      if (Mx > 0 && Mx < sketch_old.width && My > 0 && My < sketch_old.height) {
        sketch_old.rotateX(-Mx * 0.01);
        sketch_old.rotateZ(-My * 0.01);
      }
    }
  
    /**Translations (zooming) */
    sketch_old.mouseWheel = function (event) {
      console.log(event.delta);
      if (Mx > 0 && Mx < sketch_old.width && My > 0 && My < sketch_old.height) {
        if (event.delta < 0) {
          sketch_old.translate(10, 10);
        }
        else if (event.delta > 0) {
          console.log(event.delta);
          sketch_old.translate(10, 10);
        }
      }
    }

    /**Adding a graph to the canvas IN DEVELOPMENT TO ADD CUSTOM FUNCTIONS*/
    sketch_old.noFill()
    sketch_old.box(col * 3);
    sketch_old.beginShape();
    for (let x = 0; x <= col * 3; x = x + dense) {
      for (let y = 0; y <= col * 3; y = y + dense) {
        if (expression === "") {
          sketch_old.fill(Math.abs(128), Math.abs(128), Math.abs((Math.sin(x)*Math.cos(y))) * 255);
          sketch_old.curveVertex(x - col * 3 / 2, y - col * 3 / 2, Math.sin(x)*Math.cos(y)*(col * 3) / 2);
        }
        else if (SyntaxError) {
          console.log("Invalid Math expression. Use trigonometric and exponential functions preferably!")
        }
        else {
          sketch_old.fill(Math.abs(128), Math.abs(128), Math.abs(math.evaluate(expression)) * 255);
          sketch_old.curveVertex(x - col * 3 / 2, y - col * 3 / 2, math.evaluate(expression)*(col * 3) / 2);
        }
      }
    }
    sketch_old.endShape();
  }

}
// Added sketch to canvas id1
new p5(sketch1, document.getElementById("id1"));








var sketch_duo = function (sketch) {
  sketch.setup = function () {
    /**Create a canvas that is in the div with id2 */
    var canvas2 = sketch.createCanvas(500, 500, sketch.WEBGL);
    canvas2.id("canvas2");
    canvas2.parent("id2");
    sketch.frameRate(60);
    /*
    // create engine
    var engine = Engine.create();

    // two boxes and ground & world
    var world = engine.world;
    var boxA = Bodies.rectangle(100, 20, 80, 80);
    var boxB = Bodies.rectangle(150, 50, 80, 80);
    var ground = Bodies.rectangle(100, 500, 100, 60, {isStatic: true});

    console.log(boxA);

    // add boides to the world
    Composite.add(world, [boxA, boxB, ground]);
    
    // create runner
    var runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);
    */
  }
  sketch.draw = function () {
    sketch.background(200);

     /**Mouse variables to check */
     var Mx = sketch.mouseX;
     var My = sketch.mouseY;

    /**If mouse is pressed in canvas then rotate */
    if (sketch.mouseIsPressed) {    
      if (Mx > 0 && Mx < sketch.width && My > 0 && My < sketch.height) {
        sketch.rotateX(-Mx * 0.01);
        sketch.rotateZ(-My * 0.01);
      }
    }

    /**Matter.js implementation */
    sketch.cone(30, 50);
  }
}


// Added sketch to canvas id2
new p5(sketch_duo, document.getElementById("id2"));




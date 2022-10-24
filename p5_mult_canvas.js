//const { Body } = require("types/matter-js");
let capture; let img; let slider; var x; var y; var w; var h; var color;
/**To boost performance disable friendly errors */
p5.disableFriendlyErrors = true;
/**Empty expression for default math function parsing */
let expression = "";

/** Classed and function follow */
function parseFunc() {
  /**Update expression value to entered math function */
  expression = document.getElementById("inp").value;
};

var sketch1 = function (sketch_old) {
  sketch_old.setup = function () {
    /**Create a canvas that is in the div with id1 */
    var canvas1 = sketch_old.createCanvas(500, 500, sketch_old.WEBGL);
    canvas1.id("canvas1");
    canvas1.parent("id1");

    /**Add text to drag mouse */
    dragtext = sketch_old.createSpan("Drag mouse to rotate | ");
    dragtext.parent("sliders")
    dragtext.style("color: orange");

    /**Add text to slider */
    slider_size_text = sketch_old.createSpan("Change box size");
    slider_size_text.parent("sliders")
    slider_size_text.style("color: orange");


    /**Add slider for changing size of box */
    slider_size = sketch_old.createSlider(0, 100, 80, 0);
    slider_size.parent("sliders")

    /**Add text to slider */
    slider_dense_text = sketch_old.createSpan("Change density of graph lines");
    slider_dense_text.parent("sliders")
    slider_dense_text.style("color: orange");

    /**Add slider for changing grid of 3D graph */
    slider_dense = sketch_old.createSlider(5, 20, 14, 1);
    slider_dense.parent("sliders")
  };
  
  sketch_old.draw = function () {
    sketch_old.background(150);

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
        sketch_old.rotateX(-My * 0.01);
        sketch_old.rotateY(-Mx * 0.01);
      }
    }
  
    /**Adding a graph to the canvas IN DEVELOPMENT TO ADD CUSTOM FUNCTIONS*/
    sketch_old.noFill()
    sketch_old.stroke(0);
    sketch_old.box(col * 3);
    sketch_old.beginShape();
    for (let x = 0; x <= col * 3; x = x + dense) {
      for (let y = 0; y <= col * 3; y = y + dense) {
        if (expression === "") {
          sketch_old.stroke(255);
          sketch_old.curveVertex(x - col * 3 / 2, y - col * 3 / 2, Math.sin(x)*Math.cos(y)*(col * 3) / 2);
        }
        else if (SyntaxError) {
          console.log("Invalid Math expression. Use trigonometric and exponential functions preferably!")
        }
        else {
          sketch_old.stroke(255);
          sketch_old.curveVertex(x - col * 3 / 2, y - col * 3 / 2, math.evaluate(expression)*(col * 3) / 2);
        }
      }
    }
    sketch_old.endShape();
  }
};

// Added sketch to canvas id1
new p5(sketch1, document.getElementById("id1"));

let latex = document.getElementsByClassName("parsed");

var sketch_duo = function (sketch) {

  sketch.setup = function () {
    /**Create a canvas that is in the div with id2 */
    var canvas2 = sketch.createCanvas(500, 300, sketch.WEBGL);
    canvas2.id("canvas2");
    canvas2.parent("id2");
  };

  sketch.draw = function () {
    sketch.background(255);
    sketch.beginShape();
    sketch.noFill()
    sketch.rectMode();
    sketch.strokeWeight(0.5);
    sketch.fill(128, 255, 128, [0.05]);
    
    // time variable with modulo for redraw
    let time_var = (2*sketch.floor((sketch.second()) / 3) % 10) + 1;
    
    // update span variable
    let spanUpd = document.getElementById("spanElement");
    spanUpd.innerHTML = `M = ${time_var}`

    // construct plot
    for (let i = 0; i <= sketch.width; i = i + 5) {
      sketch.vertex(i - (sketch.width / 2), 15 * Math.log(i));
    };
    
    // construct rectangels
    let rectangles = Array();
    for (let i = 0; i <= sketch.width; i = i + time_var) {
      rectangles.push(sketch.rect(i - (sketch.width / 2), 15 * Math.log(i), time_var, sketch.height - 15 * Math.log(i)));
    };
    sketch.endShape(); 
  };
};
// Added sketch to canvas id2
new p5(sketch_duo, document.getElementById("id2"));

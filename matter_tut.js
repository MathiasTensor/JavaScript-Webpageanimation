// Variables
let box_x = 50;
let box_y = 50;

// engine
var engine = Matter.Engine.create({
    gravity: {
        x: 0,
        y: 0,
    }
});

// canvas element for matter.js
var canvas = document.getElementById("id_matter");

// Add renderer
var renderer = Matter.Render.create({
    engine: engine,
    canvas: canvas,
    options: {
        showCollisions: true,
        width: canvas.width, 
        height: canvas.height,
        wireframes: false,
        showDebug: false,
        showVelocity: false,
        showPositions: false,
        showStats: false,
        background: "grey",
        pixelRatio: 1,
        showPerformance: true,
    },
});

// Run renderer
Matter.Render.run(renderer);

// Add runner
var runner = Matter.Runner.create({
    delta: 1000 / 60,
});

// Run runner
Matter.Runner.run(runner, engine);

// Create mouse
var mouse = Matter.Mouse.create(document.getElementById("id_matter"));

// Create mouseConstrint
var MouseConstraint = Matter.MouseConstraint.create(engine, {
    body: null,
    canvas: document.getElementById("id_matter"),
    mouse: mouse,
});

// Add world
var world = engine.world;

// Create bodies in world
var boxA = Matter.Bodies.rectangle(canvas.width, canvas.height / 2, 50, canvas.height, {
    isStatic: true,
    render: {
        fillStyle: "#4a485b",
        lineWidth: 8,
        strokeStyle: "red"
    }
});

var boxleft = Matter.Bodies.rectangle(0, canvas.height / 2, 50, canvas.height, {
    isStatic: true,
    render: {
        fillStyle: "#4a485b",
        lineWidth: 8,
        strokeStyle: "red"
    }
});

var boxup = Matter.Bodies.rectangle(canvas.width / 2, 0, canvas.width, 50, {
    isStatic: true,
    render: {
        fillStyle: "#4a485b",
        lineWidth: 8,
        strokeStyle: "red"
    }
});

var boxB = Matter.Bodies.rectangle(canvas.width / 2, canvas.height / 2, box_x, box_y, {
    isStatic: false,
    id: "box_drag",
    friction: 0,
    render: {
        fillStyle: "yellow",
        lineWidth: 8,
        strokeStyle: "green",
    }
});

var ground = Matter.Bodies.rectangle(canvas.width / 2, canvas.height, canvas.width, 50, {
    isStatic: true,
    render: {
        fillStyle: "#4a485b", 
        strokeStyle: "red",
        lineWidth: 0,
    }
});

function funcButton1() {
    Matter.World.add(world, constrAB);
};

function funcButton2() {
    Matter.World.add(world, constrBground);
};

function funcButton3 () {
    Matter.World.add(world, constrBleft);
};

function funcButton4() {
    Matter.World.add(world, constrBup);
};

function AddGravityX() {
    let textX = document.getElementById("gravityX").value;
    engine.gravity.x = textX;
    Matter.Engine.update(engine);
    console.log(engine.gravity.x);
}

function AddGravityY() {
    let textY = document.getElementById("gravityY").value;
    engine.gravity.y = textY;
    Matter.Engine.update(engine);
    console.log(engine.gravity.y);
};
// For the function bellow
// New boxB (target box)
let boxNew = Matter.Bodies.rectangle(canvas.width / 2, canvas.height - 50, 50, 50, {
    isStatic: false,
    id: "box_new",
    render: {
        fillStyle: "yellow",
        lineWidth: 0,
        strokeStyle: "red"
    },
    }
);


// New boxup for spring control
let boxUpNew = Matter.Bodies.rectangle(canvas.width / 2, canvas.height - 100, canvas.width - 50, 25, {
    isStatic: true,
    render: {
        fillStyle: "#4a485b",
        lineWidth: 0,
        strokeStyle: "red"
    },
    }
);

function NewWorld() {
    // Clear interior of prevous world
    Matter.World.clear(world, true);
    // Change constraint in constrAB
    constrAB.bodyB = boxNew;
    // Change spring fix point
    // 75 is needed for the offset of half of box dimensions
    constrAB.pointA = {x:0, y:50*canvas.width / 4 + (4/3)*50};
    // Add some constant friction
    ground.friction = 0.5;
    boxNew.friction = 0.5;
    // Add to the world
    Matter.World.add(world, [MouseConstraint, boxA, ground, boxleft, boxup, constrAB, boxUpNew, boxNew]);
    console.log("Box pos:", boxNew.position);
    console.log("const pos", constrAB.pointA);
};

// Constraint for y values of boxNew for better animation
if (boxNew.velocity.y != 0) {
    boxNew.velocity.y = 0;
};

// Create constraint between boxA and boxB
var constrAB = Matter.Constraint.create({
    bodyA: boxA,
    bodyB: boxB,
    pointA: {x:0, y:100},
    damping: 0,
    stiffness: 0.005,
    render: {
        anchors: true,
        type: "spring",
        strokeStyle: "red"
    }
    }); 

// Create constraint between ground and boxB
var constrBground = Matter.Constraint.create({
    bodyA: ground,
    bodyB: boxB,
    damping: 0,
    stiffness: 0.005,
    render: {
        anchors: true,
        type: "spring",
        strokeStyle: "red"
    }
    });

// Create constraint between boxleft and boxB
var constrBleft = Matter.Constraint.create({
    bodyA: boxleft,
    bodyB: boxB,
    damping: 0,
    stiffness: 0.005,
    render: {
        anchors: true,
        type: "spring",
        strokeStyle: "red"
    }
});

// Create constraint between boxleft and boxB
var constrBup = Matter.Constraint.create({
    bodyA: boxup,
    bodyB: boxB,
    damping: 0,
    stiffness: 0.005,
    render: {
        anchors: true,
        type: "spring",
        strokeStyle: "red"
    }
});

// Add bodies to the world without constraint (those have callbacks)
Matter.Composite.add(world, [MouseConstraint, boxA, boxB, ground, boxleft, boxup]);

// Run render
Matter.Render.run(renderer);

// Create runner and run the runner
var runner = Matter.Runner.create({
    delta: 500,
    isFixed: false,
});

Matter.Runner.tick(runner, engine, 1000);
Matter.Runner.run(runner, engine);

// Runner constraint for velocities
Matter.Events.on(runner, "tick", function (_e) {
    // if statement
    if (Matter.Composite.get(world, "box_drag", "body")) {
        let vel = boxB.velocity;

        let dis_x = document.getElementById("vel_dis_x");
        dis_x.value = Math.round(100 * vel.x) / 100;
        let dis_y = document.getElementById("vel_dis_y");
        dis_y.value = Math.round(100 * vel.y) / 100;
    }
    else if (Matter.Composite.get(world, "box_new", "body")) {
        let vel = boxNew.velocity;

        let dis_x = document.getElementById("vel_dis_x");
        dis_x.value = Math.round(100 * vel.x) / 100;
        let dis_y = document.getElementById("vel_dis_y");
        dis_y.value = Math.round(100 * vel.y) / 100;
    }
    
});

// Callback to spring stiffness updates
Matter.Events.on(runner, "tick", (_e) => {
    // Values of sliders 1-4
    let slider1value = document.getElementById("slider1").value / 10000
    let slider2value = document.getElementById("slider2").value / 10000
    let slider3value = document.getElementById("slider3").value / 10000
    let slider4value = document.getElementById("slider4").value / 10000

    constrAB.stiffness = slider1value;
    constrBground.stiffness = slider2value;
    constrBleft.stiffness = slider3value;
    constrBup.stiffness = slider4value;

});

Matter.Events.on(MouseConstraint, "startdrag", (_e) => {
    // change color of boxV when dragged
    if (MouseConstraint.body === boxB || MouseConstraint.body === boxNew) {
        boxB.render.fillStyle = "cyan";
        boxNew.render.fillStyle = "cyan"
    }
});

Matter.Events.on(MouseConstraint, "enddrag", (_e) => {
    // change color when ending dragged
    if (MouseConstraint.body === boxB || MouseConstraint.body === boxNew) {
        boxB.render.fillStyle = "yellow";
        boxNew.render.fillStyle = "yellow";
    }
});

Matter.Events.on(runner, "afterUpdate", (_e) => {
    // Update new anchors for springs
    let slider1ypos = document.getElementById("slider1pos").value
    let slider2ypos = document.getElementById("slider2pos").value
    let slider3ypos = document.getElementById("slider3pos").value
    let slider4ypos = document.getElementById("slider4pos").value

    constrAB.length = slider1ypos;
    constrBground.length = slider2ypos;
    constrBleft.length = slider3ypos;
    constrBup.length = slider4ypos;

});

function AddRect() {
    // Adds random rectangels just for fun
    let randBody = Matter.Bodies.rectangle(Math.random()*canvas.width, Math.random()*canvas.height, 25, 25, {
        render: {
            lineWidth: 8,
            fillStyle: `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`,
            visible: true,
            strokeStyle: `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`,
        }});
    
    Matter.World.add(world, randBody);
};

function Reset() {
    Matter.World.clear(world, true);
    Matter.World.add(world, [MouseConstraint, boxA, boxB, ground, boxleft, boxup]);
}

class Graph {
    
    constructor(id, labels, data, label) {
        this.path = document.getElementById(id).getContext("2d");
        this.data = data;
        this.labels = labels;
        this.label = label; 
        this.datasets = [{
            label: this.label[0],
            data: this.data[0],
            backgroundColor: [
                `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, 1)`,
            ],
            borderColor: [
                `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, 1)`,
            ],
            borderWidth: 2
            },
            
            {label: this.label[1],
            data: this.data[1],
            backgroundColor: [
                `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, 1)`,
            ],
            borderColor: [
                `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, 1)`,
            ],
            borderWidth: 2,},

            {label: this.label[2],
            data: this.data[2],
            backgroundColor: [
                `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, 1)`,
            ],
            borderColor: [
                `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, 1)`,
            ],
            borderWidth: 1,},
        ]
    };

    create() {
        this.graph = new Chart(this.path, {
        type: "scatter",
        data: {
            labels: this.labels,
            datasets: this.datasets,
        },
        options: {
            maintainAspectRatio: false,
            responsive: false,
            scales: {
                y: {
                    beginAtZero: true,
                    min: 0,
                    max: 500,
                },
                x: {
                    beginAtZero: true
                },
            },
            maintainAspectRation: false,
            spanGaps: false,
            plugins: {
                title: {
                    text: 'Plotting box data',
                    display: true,
                },
                subtitle: {
                    display: true,
                    text: "x and y positions",
                },
                legend: {
                    labels: {
                        color: "rgb(128, 128, 128)",
                        },
                    display: true,
                    align: "end",
                    title: "Legend", 
                    },  
                filler: {
                    propagate: false,
                }           
                },
            },
        },
    )
    return this.graph
    }

    append() {
        
        let boxINIT = Matter.Composite.get(world, "box_drag", "body");
        let boxNEW = Matter.Composite.get(world, "box_new", "body");
        // Add new labels for new graph elements
        let labelXadd = this.graph.data.labels.push(engine.timing.timestamp);

        if (boxINIT) {
            // Add to x coord new data
            let boxINITaddX = this.graph.data.datasets[0].data
            boxINITaddX.push(boxINIT.position.x);
            
            //Add to y coord new data
            let boxINITaddY = this.graph.data.datasets[1].data
            boxINITaddY.push(boxINIT.position.y);

            // Change axis
            this.graph.options.scales.x.min = 0;
            this.graph.options.scales.x.max = engine.timing.timestamp;
            this.graph.options.plugins.title.text = "Observing initial box"
            this.graph.update();
        }
        else if (boxNEW) {
            // Add to x coord new data
            this.graph.data.datasets[0].data.push(boxNEW.position.x);
            // Add to y coord new data
            this.graph.data.datasets[1].data.push(boxNEW.position.y);
            // Change axis
            // Change axis
            this.graph.options.scales.x.min = 0;
            this.graph.options.scales.x.max = engine.timing.timestamp;
            this.graph.options.plugins.title.text = "Observing new box"
            this.graph.update();
        }
    };

    destroy () {
        this.graph.destroy();
    }
};

// for the x axis array index
function labelX(size) {
	let labelX = Array();
    for (let i = 0; i <= size; i++) {
	    labelX[i] = i;    
	}
    return labelX;
}

// Create plotting tool
let gtx = new Graph("canvas_graph", [], [[], []], [["x coord"], ["y coord"]]);

// graph functions
function GetGraph() {
    let cn = document.getElementById("canvas_graph");
    cn.backgroundColor = "white"
    gtx.create(); 
    // tick loop for adding positions to graph
    setInterval(() => {
        gtx.append();
    }, 1000);
};

function ClearGraph() {
    gtx.destroy(); 
}



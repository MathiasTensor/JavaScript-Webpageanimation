
var Engine = Matter.Engine,
    Events = Matter.Events,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Body = Matter.Body,
    Constraint = Matter.Constraint,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    MouseConstr = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Bodies = Matter.Bodies,
    Vector = Matter.Vector;

// Create Engine
var engine = Engine.create({
    gravity: {
        x: 0,
        y: 1,
    }
});

let world = engine.world;

// Create renderer
var renderer = Render.create({
    engine: engine,
    canvas: document.getElementById("pendulum"),
    options: {
        height: 500,
        width: 500,
        showAxes: true,
        wireframes: false,
        background: "rgb(128, 128, 128)",
        showVelocity: true,
        showPositions: true,
        showDebug: true,
    }
});

// Run renderer
Render.run(renderer);

// Create runner
var runner = Runner.create({
    delta: 100 / 60,
});
Runner.run(runner, engine);

// Create pendulum
let pendulum = Bodies.circle(renderer.options.width / 2, renderer.options.height / 2, 25, {
    id: "pendulum",
    frictionAir: 0,

    friction: 0,
    render: {
        lineWidth: 3,
        fillStyle: "blue",
    }
});

// Create celling
let celling = Bodies.rectangle(renderer.options.width / 2, renderer.options.height / 20, renderer.options.width, renderer.options.height / 10, {
    isStatic: true,
    id: "celling",
    render: {
        fillStyle: "yellow",
        lineWidth: 2,
    }
});

let ground = Bodies.rectangle(renderer.options.width / 2, renderer.options.height - 25, renderer.options.width, 50, {
    isStatic: true,
    id: "ground",
    render: {
        fillStyle: "green",
        lineWidth: 2,
    }
});

// Add second ball to spring
let pendulum2 = Bodies.circle(renderer.options.width / 2, renderer.options.height / 2 + 100, 25, {
    id: "pendulum2",
    frictionAir: 0,
    friction: 0,
    render: {
        lineWidth: 3,
        fillStyle: "pink",
    }
});

// Add constraint 1
let constr1 = Constraint.create({
    id: "constraint1",
    bodyA: pendulum,
    bodyB: celling,
    stiffness: 1,
    render: {
        anchors: true,
        type: "line",
        lineWidth: 3,
    }
});

// Add constraint 2
let constr2 = Constraint.create({
    id: "constraint2",
    bodyA: pendulum,
    bodyB: pendulum2,
    stiffness: 1,
    render: {
        anchors: true,
        type: "line",
        lineWidth: 3,
    }
});

// Add mouse constraint
let MouseConstraint = MouseConstr.create(engine);

// Add bodies and constraints to the world
let Universe = Matter.World.add(world, [pendulum, celling, constr1, MouseConstraint, ground]);
console.log(Composite.allBodies(Universe));

// Add coloring event
Events.on(MouseConstraint, "startdrag", (_e) => {
    MouseConstraint.body.render.fillStyle = "red";
});
Events.on(MouseConstraint, "enddrag", (_e) => {
    pendulum.render.fillStyle = "blue";
    pendulum2.render.fillStyle = "pink";
});

// Add lenght/gravity events
Events.on(runner, "tick", (_e) => {
    let sliderVal = document.getElementById("slider");
    let sliderVal2 = document.getElementById("slider_double");
    let gravityVal = document.getElementById("gravity");
    constr1.length = sliderVal.value;
    constr2.length = sliderVal2.value;
    engine.gravity.y = gravityVal.value;
})

function addSpring() {
    // Add second pendulum
    let addText = document.getElementById("addSpring");
    Matter.World.add(world, [constr2, pendulum2]);
    addText.disabled = true;
    addText.innerHTML = "Reset System";
}

function resetSpring() {
    Matter.World.clear(world, true);
    Matter.World.add(world, [pendulum, celling, constr1, MouseConstraint, ground]);
    let addText = document.getElementById("addSpring");
    addText.disabled = false;
    addText.innerHTML = "Add spring";
}

class Graph {
    
    constructor(id, labels, data, label, bodyID) {
        this.path = document.getElementById(id).getContext("2d");
        this.data = data;
        this.labels = labels;
        this.label = label;
        this.bodyID = bodyID; 
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
        ]
    };

    create() {
        this.graph = new Chart(this.path, {
        type: "line",
        data: {
            labels: this.labels,
            datasets: this.datasets,
        },
        options: {
            //maintainAspectRatio: false,
            //responsive: false,
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
                    text: 'Plotting Springs positions',
                    display: true,
                },
                subtitle: {
                    display: true,
                    text: `x and y positions for ${this.bodyID}`,
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
        let object = Matter.Composite.get(world, this.bodyID, "body");
        
        if (object) {
            if (object.isSleeping !== true) {
                // Add new labels for new graph elements
            let labelXadd = this.graph.data.labels.push(engine.timing.timestamp / 1000);
            let pendulumsX = this.graph.data.datasets[0].data
            let pendulumsY = this.graph.data.datasets[1].data

            // Push new coords to chart data
            pendulumsX.push(object.position.x);
            pendulumsY.push(object.position.y);

             // Change axis
             this.graph.options.scales.x.min = 0;
             this.graph.options.scales.x.max = engine.timing.timestamp / 1000;
 
             // Update
             this.graph.update();
            }   
        }
    }

    destroy () {
        this.graph.destroy();
    }
};

// Create plotting tool
let gtx1 = new Graph("plot1", [], [[], []], [["x coord"], ["y coord"]], "pendulum");
let gtx2 = new Graph("plot2", [], [[], []], [["x coord"], ["y coord"]], "pendulum2");

// graph functions
gtx1.create(); 
gtx2.create(); 

// Every second update chart
setInterval(() => {
    gtx1.append();
    gtx2.append();
}, 1000);




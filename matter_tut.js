
// engine
var engine = Matter.Engine.create({
    gravity: {
        x: 0,
        y: 1,
    }
});

// canvas element
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

var boxB = Matter.Bodies.rectangle(canvas.width / 2, canvas.height / 2, 50, 50, {
    isStatic: false,
    id: "box_drag",
    friction: 0,
    render: {
        fillStyle: "yellow",
        lineWidth: 8,
        strokeStyle: "green",
    }
});

var VecForce = Matter.Vector.create(boxB.force.x, boxB.force.y);

var ground = Matter.Bodies.rectangle(canvas.width / 2, canvas.height, canvas.width, 50, {
    isStatic: true,
    render: {
        fillStyle: "#4a485b", 
        strokeStyle: "red",
        lineWidth: 8
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

// Create constraint between boxA and boxB
var constrAB = Matter.Constraint.create({
    bodyA: boxA,
    bodyB: boxB,
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
var runner = Matter.Runner.create();

Matter.Runner.run(runner, engine);


// Runner constraint for velocities
Matter.Events.on(runner, "tick", function (_e) {
    let vel = boxB.velocity;

    let dis_x = document.getElementById("vel_dis_x");
    dis_x.value = Math.round(100 * vel.x) / 100;
    let dis_y = document.getElementById("vel_dis_y");
    dis_y.value = Math.round(100 * vel.y) / 100;
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
    let objOld = MouseConstraint.body;
    // change color when dragged
    objOld.render.visible = true,
    objOld.render.fillStyle = "cyan";
});

Matter.Events.on(MouseConstraint, "enddrag", (_e) => {
    // change color when ending dragged
    boxB.render.fillStyle = "yellow"
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

// Auxillary array for mousedown created rectangles storage
let aux = Array();

function AddRect() {
    let randBody = Matter.Bodies.rectangle(Math.random()*canvas.width, Math.random()*canvas.height, 25, 25, {
        render: {
            lineWidth: 8,
            fillStyle: `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`,
            visible: true,
            strokeStyle: `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`,
        }});
    
    let constrRand = Matter.Constraint.create({
    bodyA: randBody,
    bodyB: boxB,
    stiffness: 0.005,
    length: 50,
    damping: 0,
    render: {
        visible: true,
        anchors: true,
        type: "spring",
    },
    });
    Matter.World.add(world, randBody, constrRand);
};

function Reset() {
    Matter.World.clear(world, true);
    Matter.World.add(world, [MouseConstraint, boxA, boxB, ground, boxleft, boxup]);
}


/*
Matter.Events.on(MouseConstraint, "mousedown", (_e) => {
    // Add particles to central rectangle
    let randBody = Matter.Bodies.rectangle(Math.random()*canvas.width, Math.random()*canvas.height, 25, 25, {
        render: {
            lineWidth: 8,
            fillStyle: `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`,
            visible: true,
            strokeStyle: `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`,
        }});
    
    let constrRand = Matter.Constraint.create({
    bodyA: randBody,
    bodyB: boxB,
    stiffness: 0.005,
    damping: 0,
    render: {
        visible: true,
        anchors: true,
        type: "spring",
    },
    });
    Matter.World.add(world, randBody, constrRand);
    }
);

*/

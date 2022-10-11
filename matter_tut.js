
// engine
var engine = Matter.Engine.create();

// Add renderer
var renderer = Matter.Render.create({
    engine: engine,
    canvas: document.getElementById("id_matter"),
    options: {
        showCollisions: true,
        width: 500, 
        height: 500,
        wireframes: false,
        showDebug: true,
    },
});

// Run renderer
Matter.Render.run(renderer)

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
});

console.log(MouseConstraint);

// Add world
var world = engine.world;

// Create bodies in world
var boxA = Matter.Bodies.rectangle(100, 50, 25, 25, {
    isStatic: false,
});

var boxB = Matter.Bodies.rectangle(300, 300, 25, 50, {
    isStatic: false,
});

var ground = Matter.Bodies.rectangle(250, 500, 500, 100, {
    isStatic: true,
});

// Create stack compossite and add stack composite to the world
var stack = Matter.Composites.stack(5, 1, 1, 50, 25, 25, function (x, y) {
    return Matter.Bodies.circle(x, y, 20, {
        restitution: 0.8,
        render: {
            fillStyle: "cyan",
            strokeStyle: "black",
        },

    });
})

// Create chains
var chains = Matter.Composites.chain(stack, 1, 0, -1, 0, {
    stiffness: 0.8,
});

// Add chains to stack members
//var chains = Matter.Composite.add(stack, chains);

// Add bodies to the world
Matter.Composite.add(world, [boxA, boxB, ground, stack]);

// Constraint for stack
/*
var constr = Matter.Constraint.create({
    stiffness: 0.4,
    bodyA: stack,
});
*/
// Run render
Matter.Render.run(renderer);

// Create runner and run the runner
var runner = Matter.Runner.create();

Matter.Runner.run(runner, engine);

// Add event to instantiate box (We need a mouse constraint to instantiate object)
let aux = [];
Matter.Events.on(MouseConstraint, "mousedown", function (e) {
    aux.push(Matter.Bodies.rectangle(mouse.position.x, mouse.position.y, 25, 25));
    Matter.Composite.add(world, aux);
});

// Constraint on bodies



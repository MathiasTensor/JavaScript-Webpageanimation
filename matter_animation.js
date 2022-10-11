var Example = Example || {};

Example.doublePendulum = function() {
    var Engine = Matter.Engine,
        Events = Matter.Events,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Body = Matter.Body,
        Composite = Matter.Composite,
        Composites = Matter.Composites,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Bodies = Matter.Bodies,
        Vector = Matter.Vector;

    // Create Engine
    var engine = Engine.create();
        world = engine.world;

    // Create renderer
    var renderer = Render.create({
        engine: engine,
        canvas: document.getElementById("id_matter"),
        options: {
            height: 500,
            width: 500,
            showMousePosition: true,
            showAxes: true,
            wireframes: falsem
        }
    });

    // Run renderer
    Render.run(renderer);

    // Create runner
    var runner = Runner.create({
        delta: 100 / 60,
    });
    Runner.run(runner, engine);

    // Adding bodies to the world
    var group = Body.nextGroup(true);

    // Create pendulum
    len = 200;
    width = 25;
    var pendulum = Composites.stack(350, 160, 2, 1, -20, 0, (x, y) => {
        return Bodies.rectangle(x, y, len, width, {
            collisionFilter: {group: group},
            frictionAir: 0,
            chamfer: 5,
            render: {
                fillStyle: 'transparent',
                lineWidth: 1,
            }
        });
    });

    // Add gravity to scale
    engine.gravity.scale = 0.002;

    Composites.chain(pendulum, 0.45, 0, -0.45, 0, {
        stiffnes: 0.9,
        length: 0,
        angularStiffness: 0.7,
        render: {
            strokeStyle: '#4a485b',
        },
    });

    // Add structure to pendulum body object
    var lowerArm = pendulum.bodies[1];

    Body.rotate(lowerArm, -Math.PI * 0.3, {
        x: lowerArm.position.x - 100,
        y: lowerArm.position.y,
    });

    // Add pendulum to the world
    Composite.add(world, pendulum);

    var trail = [];

    Events.on(renderer, "afterRender", () => {
        trail.unshift({
            position: Vector.clone(lowerArm.position),
            speed: lowerArm.speed,
        })
    });

    Render.


}



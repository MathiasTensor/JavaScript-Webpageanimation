//const { Chart } = require("chart.js");

function array_sin(size) {
    //Create a random array sin
	let array = Array();
    for (let i = 0; i*2*Math.PI/size< 2*Math.PI; i++) {
	    array[i] = Math.sin(i*2*Math.PI/size);
	}
    return array;
}

function array_cos(size) {
    //Create a random array cos
	let array = Array();
    for (let i = 0; i*2*Math.PI/size< 2*Math.PI; i++) {
	    array[i] = Math.cos(i*2*Math.PI/size) + 0.05;
	}
    return array;
}

function array_idx(size) {
    // Create index array
	let array_index = Array();
    for (let i = 0; i*2*Math.PI/size < 2*Math.PI; i++) {
	    array_index[i] = (i*2*Math.PI/size).toPrecision(2);    
	}
    return array_index;
}

let id = "id3"
let path = document.getElementById(id).getContext("2d");
let data = [array_sin(200), array_cos(200), []];
let labels = array_idx(200);
let label = [["-Plotting line sin"], ["-Plotting line cos"], ["Tangent"]]; 
let datasets = [{
            label: label[0],
            data: data[0],
            backgroundColor: [
                `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, 1)`,
            ],
            borderColor: [
                `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, 1)`,
            ],
            borderWidth: 2,
            pointRadius: 1,
            pointHoverRadius: 2,
            },
            
            {label: label[1],
            data: data[1],
            backgroundColor: [
                `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, 1)`,
            ],
            borderColor: [
                `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, 1)`,
            ],
            borderWidth: 2,
            pointRadius: 1,
            pointHoverRadius: 2},

            {label: label[2],
            data: data[2],
            backgroundColor: [
                `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, 1)`,
            ],
            borderColor: [
                `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, 1)`,
            ],
            borderWidth: 2,
            pointRadius: 1,
            pointHoverRadius: 1},
        ];

let graph = new Chart(path, {
        type: "line",
        data: {
            labels: labels,
            datasets: datasets,
        },
        options: {
            onHover: AddTangent,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1,
                    min: -1,
                },
                x: {
                    ticks: {
                        stepSize: 1,
                        min: Math.PI / 2,
                        max: Math.PI * 3/2
                    },
                },
            },
            maintainAspectRation: false,
            responsive: true,
            plugins: {
                title: {
                    text: 'Plotting trigonometric data',
                    display: true,
                },
                subtitle: {
                    display: true,
                    text: "Click on sin & cos for tangent",
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

function update(graph) {
    // Update graph
    graph.update();
};


function AddTangent(ev, data, graf) {
    // Adds tangent at the clicked point. Uses auxillary plotTangent function
    // ev gives us mouse coords, data gives us the index and graph num. graph we dont need
    if (ev.type === "click") {

        if (data[0].datasetIndex === 1) {
            graph.data.datasets[2].label = [`-Tangent to graph ${data[0].datasetIndex + 1} at x=${(data[0].index * 2*Math.PI / array_idx(200).length).toPrecision(2)}`];
            /*graph.data.datasets[2].data =array_idx(200).forEach((val, ind, arr) => {
                plotTangent(graph.data.datasets[0].data[data[0].index], data[0].index, graph.data.datasets[1].data[data[0].index], ind);
            });*/
            graph.data.datasets[2].data = plotTangent(-graph.data.datasets[0].data[(data[0].index)], (data[0].index * 2*Math.PI / array_idx(200).length).toPrecision(2), graph.data.datasets[1].data[(data[0].index)], array_idx(200));
            
        update(graph);
        };
        if (data[0].datasetIndex === 0) {
                graph.data.datasets[2].label = [`-Tangent to graph ${data[0].datasetIndex + 1} at x=${(data[0].index * 2*Math.PI / array_idx(200).length).toPrecision(2)}`];
                /*graph.data.datasets[2].data =array_idx(200).forEach((val, ind, arr) => {
                    plotTangent(graph.data.datasets[0].data[data[0].index], data[0].index, graph.data.datasets[1].data[data[0].index], ind);
                });*/
                graph.data.datasets[2].data = plotTangent(graph.data.datasets[1].data[(data[0].index)], (data[0].index * 2*Math.PI / array_idx(200).length).toPrecision(5), graph.data.datasets[0].data[(data[0].index)], array_idx(200));
                
            update(graph);
        };
    };
}; 

function plotTangent(m, xINIT, yINIT, index_array) {
    // Function that creates a tangent at the point(xINIT, yINIT)
    let n = yINIT - m * xINIT;
    let array = [];
    for (let index = 0; index < index_array.length; index++) {
        array[index] = m * (index*2*Math.PI/index_array.length).toPrecision(5) + n;  
    };
    return array;
};
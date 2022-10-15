//const { Chart } = require("chart.js");

/** For the initial sine graph */

function array_rand_sin(size) {
	let array = Array();
	/**Create a random array sin*/
    for (let i = 0; i*2*Math.PI/size< 2*Math.PI; i++) {
	    array[i] = Math.sin(i*2*Math.PI/size);
	}
    return array;
}

/** For the shifted cos graph */

function array_rand_cos(size) {
	let array = Array();
    	/**Create a random array cos*/
    for (let i = 0; i*2*Math.PI/size< 2*Math.PI; i++) {
	    array[i] = Math.cos(i*2*Math.PI/size);
	}
    return array;
}

/**For tangent line */

function array_tangent(size) {
    let tang = Array();
    for (let i = 0; i*2*Math.PI/size< 2*Math.PI; i++) {
	    tang[i] = -(i*2*Math.PI/size) + Math.PI;
    }
    return tang;
}

/**Create index array */

function array_idx(size) {
	let array_index = Array();
    for (let i = 0; i*2*Math.PI/size < 2*Math.PI; i++) {
	    array_index[i] = (i*2*Math.PI/size).toPrecision(2);    
	}
    return array_index;
}

/**For the tangent line */

function tangent_lines(array_rand, array_idx) {
    let y = array_rand();
    let x = array_idx();
    let m_container = Array();
    for (let i = 0; i <= y.length; i = i++) {
        m_container[i] = (y[i + 1] - y[i]) / (x[i + 1]- x[i]);
    }
    return m_container;
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
    }

    create() {
        let graph = new Chart(this.path, {
        type: "line",
        data: {
            labels: this.labels,
            datasets: this.datasets,
        },
        options: {
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
            spanGaps: false,
            plugins: {
                title: {
                    text: 'Plotting trigonometric data',
                    display: true,
                },
                subtitle: {
                    display: true,
                    text: "sin & cos",
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
    return graph
    }

}

let gph = new Graph("id3", array_idx(200), [array_rand_sin(200), array_rand_cos(200), array_tangent(200)], [["-Plotting line sin"], ["-Plotting line cos"], ["Tangent to sin at x=0"]]);
gph.create();


const {Chart} = require("chart.js");

function array_rand() {
	let array = Array();
	/**Create a random array */
	for (let i = 0; i < 100; i++) {
	    array[i] = Math.random()*10;
	    
	}
    return array
}

function array_idx() {
	/**Create index array */
	let array_index = Array();
	for (let i = 0; i < 100; i++) {
	    array_index[i] = i;
	    
	}
    return array_index
}


let ctx_new = document.getElementById("id3").getContext("2d");
let char = new Chart(ctx_new, {
    type: "line",
    data: {
        labels: array_idx(),
        datasets:[{
            label: ["Plotting random data"],
            data: array_rand(),
            backgroundColor: [
                'rgba(255, 120, 0, 1)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        maintainAspectRation: false,
        animations: {
            tension: {
                duration: 1000,
                easing: "linear",
                loop: true,
                from: 0,
                to: array_idx.length,
                },
            },

        plugins: {
            title: {
                text: 'Plottig random data',
                display: true,
            },
            subtitle: {
                display: true,
                text: "This is a subtitle",
            },
            legend: {
                labels: {
                    color: "rgb(128, 128, 128)",
                    },
                },
                display: true,
                align: "end",
                title: "Legend",  
                onClick: updateGraph,              
            },
            
        },
    },
)
//


function updateGraph(evt, item, legend) {
    //Chart.defaults.
    console.log("Pretty Colors")
}



char.onClick = (evt) => {
    var ActivePoints = char.getElementsAtEvent(evt);
    console.log("events", ActivePoints);
}


console.log(char.config.data);
console.log(char.config.options);
char.resize(500, 500);
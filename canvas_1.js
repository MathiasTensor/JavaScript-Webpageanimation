//const {Chart} = require("chart.js");

function updateGraph(e, legendItem, legendElement) {
    Chart.defaults.
    console.log("Pretty Colors")
}


let ctx_new = document.getElementById("id3").getContext("2d");
let char = new Chart(ctx_new, {
    type: "bar",
    data: {
        labels: ["a", "b", "c"],
        datasets:[{
            label: ["Number of votes"],
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
            }
        },
        maintainAspectRation: false,
        plugins: {
            title: {
                text: 'This is the title of the graph',
                display: true,
            },
            subtitle: {
                display: true,
                text: "This is a subtitle",
            },
            legend: {
                labels: {
                    color: "rgb(12, 128, 50)",
                    },
                },
                display: true,
                align: "end",
                title: "Legend",  
                onClick: updateGraph              
            }
            
        }
    }
)

char.resize(500, 500)
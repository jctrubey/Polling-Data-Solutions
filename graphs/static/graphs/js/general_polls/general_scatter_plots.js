let btn = document.getElementById('addData');
let colors = ["#3333ff", "#33ff33", "#ff0000", "#ffff1a"];
let data_dict = {
    label: [],
    backgroundColor: [],
    data: []
};
function set_data_dict() {
    data_dict = {
        label: [],
        backgroundColor: [],
        data: []
    };
}


//build chart
let myChart = new Chart(document.getElementById("scatter-plot"), {
    type: 'scatter',
    data: {
        datasets: []
    },
    options: {
        title: {
            display: true,
            text: "Display Data"
        },
        scales: {
            xAxes: [{
                type: 'time',
            }]
        }
    }
});

//retrieves the data for selected candidates and passes data back to the chart and updates it

btn.addEventListener('click', function () {
    let checkboxes = document.getElementsByClassName("candidates");
    let candidates = [];
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            candidates.push(checkboxes[i].value);
        }
    }
    if (myChart.data.datasets[0]) {
        myChart.data.datasets = [];
        myChart.update();
    }

    for (let i = 0; i < candidates.length; i++) {
        $.ajax({
            type: "GET",
            url: '/graphs/general-scatter-plots/',
            data: {
                candidate: candidates[i]
            },
            success: function (data) {
                data = JSON.parse(data);
                let length = 0;
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        length++;
                    }
                }

                for (let i = 0; i < length; i++) {
                    data_dict.data.push({
                        x: data[i]['date'],
                        y: data[i]['pct']
                    });
                    data_dict.backgroundColor.push(colors[myChart.data.datasets.length]);
                }

                data_dict.label.push(data[0]['candidate']);
                myChart.data.datasets.push(data_dict);
                myChart.update();
                set_data_dict();
            }
        })
    }
});
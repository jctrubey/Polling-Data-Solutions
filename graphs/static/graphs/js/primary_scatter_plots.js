let btn = document.getElementById('addData');
let sel_primary = document.getElementById('primary');
let dem_candidates = document.getElementById('DemCandidates');
let rep_candidates = document.getElementById('RepCandidates');
let select_options = document.getElementsByName('checkboxes');

//array of colors to be used in the chart
let colors = ["#3333ff", "#33ff33", "#ff0000", "#ffff1a"];

//data dict that will be passed to chart to display data
let data_dict = {
    label: [],
    backgroundColor: [],
    data: []
};

//sets the data dict back to empty to hold next set
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
            url: '/graphs/primary-scatter-plots/',
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

// displays the correct primary candidates to select from
function select_primary() {
    for (let i = 0; i < select_options.length; i ++) {
        if (select_options[i].checked == true) {
            select_options[i].checked = false;
        }
    }

    dem_candidates.classList.toggle("hide");
    rep_candidates.classList.toggle("hide");

}
let AddressForm = document.getElementById('AddressForm');
let submit = document.getElementById('submit');
let content = document.getElementById('content');
let addressInput = document.getElementById('inputAddress');
let addressInput2 = document.getElementById('inputAddress2');
let cityInput = document.getElementById('inputCity');
let stateInput = document.getElementById('inputState');
let zipInput = document.getElementById('inputZip');
let official_select = document.getElementById('official');
let office_select = document.getElementById('office');

//prevent default form action
AddressForm.addEventListener("submit", function (e) {
    e.preventDefault();
});

//submit function for search form
function submitFunction() {
    let address = addressInput.value;
    let address2 = addressInput2.value;
    let city = cityInput.value;
    let state = stateInput.value;
    let zip = zipInput.value;
    let finaladdress = address + address2 + city + state + zip;

    //send data to django to handle api request
    $.ajax({
        type:"GET",
        url: '/search/',
        data: {
            address: finaladdress
        },
        success: function (data) {

            AddressForm.style.display = "none";
            data = JSON.parse(data);
           
            let offices = data['offices'];
            let officials = data['officials'];

            for (let i = 0; i < Object.keys(officials).length; i++) {
                let element = officials[i]['name'];
                let option = document.createElement("option");
                option.text = element;
                official_select.add(option);
            }

            for (let i = 0; i < Object.keys(offices).length; i++) {
                let element = offices[i]['name'];
                let option = document.createElement("option");
                option.text = element;
                office_select.add(option);
            }

            document.getElementById('options').classList.remove('hide');
        
        }
    })
}


//will display information on the official selected
function official_fun() {
    console.log(official_select.options[official_select.selectedIndex].text);
}

// will display information on the office selected
function office_fun() {
    console.log(office_select.options[office_select.selectedIndex].text);
}

//displays the correct select tag based on what the user chooses: offices or officials
function o_selection(item) {
    let official_group = document.getElementById('official_group');
    let office_group = document.getElementById('office_group');

    if (item.options[item.selectedIndex].text == 'Officials') {
        official_group.classList.remove("hide");
        if (!office_group.classList.contains("hide")) {
            office_group.classList.add("hide");
        }
    }
    else if (item.options[item.selectedIndex].text == 'Offices') {
        office_group.classList.remove("hide");
        if (!official_group.classList.contains("hide")) {
            official_group.classList.add("hide");
        }
    }
}
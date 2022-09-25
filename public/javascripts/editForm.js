fetch('/api/data.html')
    .then(res => res.json())
    .then(data => listCities(data))
    .catch(err => console.log(err));

let array = []
const listCities = (data) => {
    for (let i = 0; i < data.data.length; i++) {
        array.push(data.data[i])
    }
}

//Autocompletar Origin City Ocity
const ocityInput = document.querySelector('#ocity');
const ocityResults = document.querySelector('.ocityResults')
ocityInput.addEventListener('keyup', (e) => {
    ocityResults.innerHTML = '';

    for (let city of array) {
        const cityName = city.name;
        if (cityName.toLowerCase().startsWith(ocityInput.value.toLowerCase()) && ocityInput.value != "") {
            let divResult = document.createElement('p');
            ocityResults.classList.add('d-block');
            divResult.innerHTML = cityName;
            ocityResults.append(divResult);

            divResult.addEventListener('click', () => {
                ocityInput.value = cityName;
                ocityResults.classList.remove('d-block');
            })
        }
    }
})


//Autocompletar Dcity
const dcityInput = document.querySelector('#dcity');
const dcityResults = document.querySelector('.dcityResults')
dcityInput.addEventListener('keyup', (e) => {
    dcityResults.innerHTML = '';

    for (let city of array) {
        const cityName = city.name;
        if (cityName.toLowerCase().startsWith(dcityInput.value.toLowerCase()) && dcityInput.value != "") {
            let divResult = document.createElement('p');
            dcityResults.classList.add('d-block');
            divResult.innerHTML = cityName;
            dcityResults.append(divResult);

            divResult.addEventListener('click', () => {
                dcityInput.value = cityName;
                dcityResults.classList.remove('d-block');
            })
        }
    }
})


//Format Phone
const brokerPhoneInput = document.getElementById("brokerPhone");
brokerPhoneInput.addEventListener("keypress", phonenumberFormatter);

function phonenumberFormatter() {
    const inputField = document.getElementById('brokerPhone');
    const formattedInputValue = formatPhoneNumber(inputField.value);
    inputField.value = formattedInputValue;
};


function formatPhoneNumber(value) {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
        3,
        6
    )}-${phoneNumber.slice(6, 9)}`;
}



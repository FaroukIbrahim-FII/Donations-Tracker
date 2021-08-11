'use strict';

let form = document.getElementById('from');
let table = document.getElementById('table');
let clearButton = document.getElementById('clearbutton');

let warningText = document.createElement('p');
form.appendChild(warningText);


let parsedArr = 0;
let all = [];

let globalStorage = localStorage.getItem('donation');
parsedArr = JSON.parse(globalStorage);

if (globalStorage !== null) {
    let importedArr = localStorage.getItem('donation');
    let newParsedArr = JSON.parse(importedArr);
    for (let i = 0; i < newParsedArr.length; i++) {
        new Donation(newParsedArr[i].name, newParsedArr[i].amount);
        all[i].age = newParsedArr[i].age;

    }
    render();
}


function Donation(name, amount) {

    this.name = name;
    this.amount = amount;
    this.age = 0;

    all.push(this);
}

// from W3 Schools
Donation.prototype.randomNum = function () {
    this.age = Math.floor(Math.random() * (60 - 20) ) + 20;

}

// (min, max) {
//     return Math.floor(Math.random() * (max - min) ) + min;
//   }

form.addEventListener('submit', donationSubmit);



function donationSubmit(event) {
    event.preventDefault();

    let donarName = event.target.username.value;
    let donationAmout = parseInt(event.target.donationlist.value);
    // console.log(donarName, donationAmout);


    if (donarName !== "") {
        let newObj = new Donation(donarName, donationAmout);

        newObj.randomNum();

        console.log(all);

        let strigArr = JSON.stringify(all);
        localStorage.setItem('donation', strigArr);
        let newArr = localStorage.getItem('donation');
        parsedArr = JSON.parse(newArr);

        if (parsedArr !== null) {
            all = [];
            for (let i = 0; i < parsedArr.length; i++) {
                new Donation(parsedArr[i].name, parsedArr[i].amount);
                all[i].age = parsedArr[i].age;

            }

        }
        render();
    } else {

        warningText.textContent = "";
        warningText.textContent = "Please enter your name."

    }
}

function render() {

    table.textContent = "";
    let tableHead = document.createElement('thead');
    table.appendChild(tableHead);


    let nameHead = document.createElement('th');
    tableHead.appendChild(nameHead);
    nameHead.textContent = "Name";

    let AmountHead = document.createElement('th');
    tableHead.appendChild(AmountHead);
    AmountHead.textContent = "Donation Amount";

    let ageHead = document.createElement('th');
    tableHead.appendChild(ageHead);
    ageHead.textContent = "Age";

    for (let i = 0; i < parsedArr.length; i++) {
        let tableRow = document.createElement('tr');
        table.appendChild(tableRow);

        let nameTd = document.createElement('td');
        tableRow.appendChild(nameTd);
        nameTd.textContent = parsedArr[i].name;

        let amoutTd = document.createElement('td');
        tableRow.appendChild(amoutTd);
        amoutTd.textContent = `${parsedArr[i].amount} Dinar`;

        let ageTd = document.createElement('td');
        tableRow.appendChild(ageTd);
        ageTd.textContent = parsedArr[i].age;
    }
}

clearButton.addEventListener('click', removeItems);

function removeItems() {
    table.textContent = "";
    localStorage.clear();

    // disabled attribute from W3 Schools
    clearButton.setAttribute('disabled', 'true');
    location.reload();
}


render();
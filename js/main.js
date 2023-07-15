const title = document.getElementById('title');
const main_page_header = document.getElementById('main_page_header');
const main_page = document.getElementById('main_page');
const patients_button = document.getElementById('patients_button');
const recipes_button = document.getElementById('recipes_button');
const modal_container = document.getElementById('modal_container');
const diagnose_button = document.getElementById('diagnose_button');


function showLoadingAlert() {
    const main_page_header = document.getElementById('main_page_header');

    main_page_header.innerHTML =
        `
    <h1 class="d-flex align-items-center">
        <div class="spinner-border text-success" role="status"></div>&nbsp;
        <span>Fetching data ...</span>
    </h1>
    `;
};


function calcTime(offset, date) {
    // create Date object for current location
    var d = new Date(date);

    // convert to msec
    // subtract local time zone offset
    // get UTC time in msec
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    // create new Date object for different city
    // using supplied offset
    var nd = new Date(utc + (3600000*offset));

    // return time as a string
    return nd.toLocaleString();
};

const host = 'localhost';


const HOST = `https://xan0037.uz`;
//const HOST = `http://127.0.0.1:8000`;
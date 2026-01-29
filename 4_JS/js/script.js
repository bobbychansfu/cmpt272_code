
const nameInput = document.getElementById('nameInput');
const btnHello = document.getElementById('btnHello');
const basicOut = document.getElementById('basicOut');

btnHello.addEventListener('click', () => {
    const name = nameInput.value.trim() || 'friend';
    const age = 20; // number example
    const isStudent = true; // boolean example

    const msg = `Hello, ${name}!`;
    console.log(msg);

    basicOut.textContent = [
        msg,
        `typeof name = ${typeof name}`,
        `typeof age = ${typeof age}`,
        `typeof isStudent = ${typeof isStudent}`,
        'Also check the Console tab for log output.'
    ].join('\n');
});

//-- control structures

const hourInput = document.getElementById('hourInput');
const btnGreet = document.getElementById('btnGreet');
const greetOut = document.getElementById('greetOut');

btnGreet.addEventListener('click', () => {
    const h = Number(hourInput.value);

    let greeting;
    if (Number.isNaN(h) || h < 0 || h > 23) {
        greeting = 'Please enter an hour from 0 to 23.';
    } else if (h < 12) {
        greeting = 'Good morning!';
    } else if (h < 18) {
        greeting = 'Good afternoon!';
    } else {
        greeting = 'Good evening!';
    }

    greetOut.textContent = greeting;
});

const btnCount = document.getElementById('btnCount');
const btnClearCount = document.getElementById('btnClearCount');
const countList = document.getElementById('countList');

btnCount.addEventListener('click', () => {
    countList.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = `Count: ${i}`;
        countList.appendChild(li);
    }
});

btnClearCount.addEventListener('click', () => {
    countList.innerHTML = '';
});

//-- arrays

const countryInput = document.getElementById('countryInput');
const btnAddCountry = document.getElementById('btnAddCountry');
const btnPopCountry = document.getElementById('btnPopCountry');
const btnSortCountries = document.getElementById('btnSortCountries');
const btnJoinCountries = document.getElementById('btnJoinCountries');
const countryList = document.getElementById('countryList');
const countryOut = document.getElementById('countryOut');

const countries = ['Canada', 'Mexico', 'Japan'];

function renderCountries(note = '') {
    countryList.innerHTML = '';
    for (const c of countries) {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.textContent = c;
        const badge = document.createElement('span');
        badge.className = 'badge text-bg-secondary';
        badge.textContent = c.length;
        li.appendChild(badge);
        countryList.appendChild(li);
    }

    countryOut.textContent = [
        note,
        `countries.length = ${countries.length}`,
        `countries = [${countries.join(', ')}]`
    ].filter(Boolean).join('\n');
}

renderCountries('Initial array loaded.');

btnAddCountry.addEventListener('click', () => {
    const value = countryInput.value.trim();
    if (!value) return;
    countries.push(value);
    countryInput.value = '';
    renderCountries('Added with push().');
});

btnPopCountry.addEventListener('click', () => {
    const removed = countries.pop();
    renderCountries(`Removed with pop(): ${removed ?? '(nothing to pop)'}`);
});

btnSortCountries.addEventListener('click', () => {
    countries.sort();
    renderCountries('Sorted with sort().');
});

btnJoinCountries.addEventListener('click', () => {
    countryOut.textContent = `join(', '): ${countries.join(', ')}`;
});

//-- objects

const cityInput = document.getElementById('cityInput');
const btnSetCity = document.getElementById('btnSetCity');
const studentOut = document.getElementById('studentOut');

const student = {
    name: 'Bobby',
    id: 272,
    city: 'Burnaby'
};

function renderStudent() {
    const lines = [
        `student.name = ${student.name}`,
        `student["name"] = ${student['name']}`,
        `student.city = ${student.city}`,
        `student object: ${JSON.stringify(student, null, 2)}`
    ];
    studentOut.textContent = lines.join('\n');
}

renderStudent();

btnSetCity.addEventListener('click', () => {
    const newCity = cityInput.value.trim();
    if (!newCity) return;
    student.city = newCity;
    renderStudent();
});

//-- functions

const priceInput = document.getElementById('priceInput');
const qtyInput = document.getElementById('qtyInput');
const btnCompute = document.getElementById('btnCompute');
const funcOut = document.getElementById('funcOut');

function subtotal(price, qty) {
    return price * qty;
}

const formatMoney = function (n) {
    return `$${n.toFixed(2)}`;
};

// Callback usage
function applyChange(amount, fn) {
    return fn(amount);
}

const addGST = (amt) => amt * 1.05;
const tenPercentOff = (amt) => amt * 0.9;

btnCompute.addEventListener('click', () => {
    const price = Number(priceInput.value);
    const qty = Number(qtyInput.value);

    if (!Number.isFinite(price) || !Number.isFinite(qty) || qty <= 0) {
        funcOut.textContent = 'Please enter a valid price and quantity.';
        return;
    }

    const sub = subtotal(price, qty);
    const withTax = applyChange(sub, addGST);
    const withDiscount = applyChange(sub, tenPercentOff);

    funcOut.textContent = [
        `subtotal(price, qty) = ${formatMoney(sub)}`,
        `applyChange(subtotal, addGST) = ${formatMoney(withTax)}`,
        `applyChange(subtotal, tenPercentOff) = ${formatMoney(withDiscount)}`
    ].join('\n');
});

//-- DOM manipulation
const domBox = document.getElementById('domBox');
const domText = document.getElementById('domText');
const btnToggleHighlight = document.getElementById('btnToggleHighlight');
const btnSetText = document.getElementById('btnSetText');
const btnSetHTML = document.getElementById('btnSetHTML');

btnToggleHighlight.addEventListener('click', () => {
    domBox.classList.toggle('border-primary');
    domBox.classList.toggle('bg-warning-subtle');
});

btnSetText.addEventListener('click', () => {
    domText.textContent = `Updated at ${new Date().toLocaleTimeString()}`;
});

btnSetHTML.addEventListener('click', () => {
    domText.innerHTML = `This was set with <code>innerHTML</code> at <strong>${new Date().toLocaleTimeString()}</strong>.`;
});

//-- events
const eventBox = document.getElementById('eventBox');
const eventOut = document.getElementById('eventOut');

eventBox.addEventListener('click', (e) => {
    eventOut.textContent = `clientX=${e.clientX}, clientY=${e.clientY}`;
});

//-- localStorage
const STORAGE_KEY = 'cmpt272Name';
const storageInput = document.getElementById('storageInput');
const btnSaveStorage = document.getElementById('btnSaveStorage');
const btnLoadStorage = document.getElementById('btnLoadStorage');
const btnClearStorage = document.getElementById('btnClearStorage');
const storageOut = document.getElementById('storageOut');

function setStorageMsg(msg, type = 'secondary') {
    storageOut.className = `mt-3 mb-0 text-${type}`;
    storageOut.textContent = msg;
}

btnSaveStorage.addEventListener('click', () => {
    const v = storageInput.value;
    localStorage.setItem(STORAGE_KEY, v);
    setStorageMsg('Saved to localStorage. Refresh the page and click Load.', 'success');
});

btnLoadStorage.addEventListener('click', () => {
    const v = localStorage.getItem(STORAGE_KEY);
    setStorageMsg(v === null ? 'Nothing stored yet.' : `Loaded: ${v}`, v === null ? 'secondary' : 'primary');
});

btnClearStorage.addEventListener('click', () => {
    localStorage.removeItem(STORAGE_KEY);
    setStorageMsg('Cleared localStorage key cmpt272Name.', 'danger');
});

//-- fetch
const citySelect = document.getElementById('citySelect');
const timeFeedback = document.getElementById('timeFeedback');

citySelect.addEventListener('change', async () => {
    const timezone = citySelect.value;

    if (!timezone) {
        timeFeedback.style.display = 'none';
        return;
    }

    timeFeedback.style.display = 'block';
    timeFeedback.textContent = 'Fetching time...';
    timeFeedback.className = 'alert alert-info mt-3';

    try {
        const response = await fetch(`https://worldtimeapi.org/api/timezone/${timezone}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const dateTime = new Date(data.datetime);
        const formattedTime = dateTime.toLocaleString();

        timeFeedback.textContent = `Current time in ${timezone.split('/')[1].replace('_', ' ')}: ${formattedTime}`;
        timeFeedback.className = 'alert alert-success mt-3';
    } catch (error) {
        timeFeedback.textContent = `Error fetching time: ${error.message}`;
        timeFeedback.className = 'alert alert-danger mt-3';
    }
});

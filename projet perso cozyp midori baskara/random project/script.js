// --- date actuelle---
var date = new Date();
var currentMonth = date.getMonth();
var currentYear = date.getFullYear();

var months = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"
];

// --- titre a jour ---
function updateTitle() {
    document.getElementById("title").innerHTML = "🌸 " + months[currentMonth] + " " + currentYear + " 🌸";
}
updateTitle();

// --- titre des activité ---
var habitTitle = document.getElementById("habitTitle");
habitTitle.onclick = function () {
    let habits = prompt("Quels sont vos activités ?", habitTitle.innerHTML);
    habitTitle.innerHTML = habits && habits.length > 0 ? habits : "Cliquez pour voir vos activités";
};

function updateLabels() {
    let prev = currentMonth - 1;
    let next = currentMonth + 1;

    if (prev < 0) prev = 11;
    if (next > 11) next = 0;

    document.getElementById("prevLabel").textContent = months[prev];
    document.getElementById("nextLabel").textContent = months[next];
}

// --- popup ---
const popup = document.getElementById("popup");
const popupDate = document.getElementById("popup-date");
const eventText = document.getElementById("event-text");
const journalText = document.getElementById("journal-text");
const saveBtn = document.getElementById("save-popup");
const closeBtn = document.getElementById("close-popup");

let selectedKey = "";

// ouverture du popup
function openPopup(day, month, year) {
    selectedKey = `${day}-${month + 1}-${year}`;
    popupDate.textContent = `${day} ${months[month]} ${year}`;

    const saved = JSON.parse(localStorage.getItem(selectedKey)) || { event: "", journal: "" };

    eventText.value = saved.event;
    journalText.value = saved.journal;

    popup.classList.remove("hidden");
}

// popup fermer
closeBtn.onclick = () => popup.classList.add("hidden");

// sauvegarde du popup
saveBtn.onclick = () => {
    const data = {
        event: eventText.value,
        journal: journalText.value
    };

    localStorage.setItem(selectedKey, JSON.stringify(data));
    popup.classList.add("hidden");
    renderCalendar(currentMonth, currentYear);
};

// --- marques les jours avec notes ---
function markDaysWithNotes(month, year) {
    const allDays = document.querySelectorAll(".day");

    allDays.forEach(dayDiv => {
        dayDiv.classList.remove("has-note");
        if (dayDiv.style.visibility === "hidden") return;

        const day = dayDiv.textContent;
        const key = `${day}-${month + 1}-${year}`;
        const saved = JSON.parse(localStorage.getItem(key));

        if (saved && (saved.event || saved.journal)) {
            dayDiv.classList.add("has-note");
        }
    });
}

// --- calendrier ---
function renderCalendar(month, year) {
    const grid = document.getElementById("calendarGrid");
    grid.innerHTML = "";

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    let row = document.createElement("div");
    row.classList.add("days");

    let emptySlots = firstDay === 0 ? 6 : firstDay - 1;
    for (let i = 0; i < emptySlots; i++) {
        const empty = document.createElement("div");
        empty.classList.add("day");
        empty.style.visibility = "hidden";
        row.appendChild(empty);
    }

    for (let d = 1; d <= lastDate; d++) {
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("day");
        dayDiv.textContent = d;

        dayDiv.onclick = () => openPopup(d, month, year);

        row.appendChild(dayDiv);

        if (row.children.length === 7) {
            grid.appendChild(row);
            row = document.createElement("div");
            row.classList.add("days");
        }
    }

    grid.appendChild(row);
    markDaysWithNotes(month, year);
}

// --- menu des années---
const yearDropdown = document.getElementById("yearDropdown");

function populateYears(start, end) {
    for (let y = start; y <= end; y++) {
        const option = document.createElement("option");
        option.value = y;
        option.textContent = y;
        yearDropdown.appendChild(option);
    }
}

yearDropdown.onchange = () => {
    currentYear = parseInt(yearDropdown.value);
    updateTitle();
    renderCalendar(currentMonth, currentYear);
    updateLabels();
};

// --- bouton de nav ---
document.getElementById("prevMonth").onclick = () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
        yearDropdown.value = currentYear;
    }
    updateTitle();
    renderCalendar(currentMonth, currentYear);
    updateLabels();
};

document.getElementById("nextMonth").onclick = () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
        yearDropdown.value = currentYear;
    }
    updateTitle();
    renderCalendar(currentMonth, currentYear);
    updateLabels();
};

// --- initialisation ---
populateYears(2007, 2035);
yearDropdown.value = currentYear;

renderCalendar(currentMonth, currentYear);
updateLabels();




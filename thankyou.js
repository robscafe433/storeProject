let date = new Date();

let month = date.getMonth();
let calendarNumericalDay = date.getDate();
let weekday = date.getDay();
let processingDays = "null";
let shipOutOnWeekDay = "null";

let weekdaysArray = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

let eta = document.querySelector(".eta");

// Delivery Dates: -------------------------------------------------------
console.log(weekday);

//0-Sunday ... Saturday-6

if (weekday == 0) {
    // Sunday orders:
    shipOutOnWeekDay = 3; // Wednesday
    processingDays = 3;
    eta.innerHTML = `
        <h5>${weekdaysArray[shipOutOnWeekDay]}, 9AM - 11AM</h5>
        <h5>${month + 1}/${calendarNumericalDay + processingDays}</h5>
    `;
} else if (weekday == 6) {
    // Saturday orders:
    shipOutOnWeekDay = 3; // Wednesday
    processingDays = 4; //processing Monday for shipping on Wednesday
    eta.innerHTML = `
        <h5>${weekdaysArray[shipOutOnWeekDay]}, 9AM - 11AM</h5>
        <h5>${month + 1}/${calendarNumericalDay + processingDays}</h5>
    `;
} else if (weekday == 4) {
    // Thursday orders:
    shipOutOnWeekDay = 1; // Monday
    processingDays = 4; //processing Thursday for shipping on Monday
    eta.innerHTML = `
        <h5>${weekdaysArray[shipOutOnWeekDay]}, 9AM - 11AM</h5>
        <h5>${month + 1}/${calendarNumericalDay + processingDays}</h5>
    `;
} else if (weekday == 5) {
    // Friday orders:
    processingDays = 4; //processing Friday for shipping on Tuesday
    shipOutOnWeekDay = 2; // Tuesday
    eta.innerHTML = `
        <h5>${weekdaysArray[shipOutOnWeekDay]}, 9AM - 11AM</h5>
        <h5>${month + 1}/${calendarNumericalDay + processingDays}</h5>
    `;
} else {
    processingDays = 2;
    shipOutOnWeekDay = weekday + processingDays;
    eta.innerHTML = `
        <h5>${weekdaysArray[shipOutOnWeekDay]}, 9AM - 11AM</h5>
        <h5>${month + 1}/${calendarNumericalDay + processingDays}</h5>
    `;
}

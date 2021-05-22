let date = new Date();

let month = date.getMonth();
let dates = date.getDate();
let weekday = date.getDay();
let processingDays = "null";
let shipOutOnWeekDay = "null";

let weekdays = [
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

if (weekday == 0) {
    // Sunday orders:
    shipOutOnWeekDay = 3; // Wednesday
    processingDays = 3;
    console.log("Will be shipped out on Wednesday");
    console.log(month, "/", dates + processingDays);
    eta.innerHTML = `
        <h5>${weekdays[shipOutOnWeekDay]}, 9AM - 11AM</h5>
        <h5>${month + 1}/${dates + processingDays}</h5>
    `;
} else if (weekday == 6) {
    // Saturday orders:
    shipOutOnWeekDay = 3; // Wednesday
    processingDays = 4; //processing Monday for shipping on Wednesday
    shippingDate = dates + processingDays;
    console.log("Will be shipped out on Wednesday");
    console.log(month + 1, "/", dates + processingDays);
    eta.innerHTML = `
        <h5>${weekdays[shipOutOnWeekDay]}, 9AM - 11AM</h5>
        <h5>${month + 1}/${dates + processingDays}</h5>
    `;
} else if (weekday == 4) {
    // Thursday orders:
    processingDays = 4; //processing Thursday for shipping on Monday
    shippingDate = dates + processingDays;
    console.log("Will be shipped out on Tuesday");
    console.log(month, "/", dates + processingDays);
    eta.innerHTML = `
        <h5>${weekdays[shipOutOnWeekDay]}, 9AM - 11AM</h5>
        <h5>${month + 1}/${dates + processingDays}</h5>
    `;
} else if (weekday == 5) {
    // Friday orders:
    processingDays = 4; //processing Friday for shipping on Tuesday
    shippingDate = dates + processingDays;
    console.log("Will be shipped out on Tuesday");
    console.log(month, "/", dates + processingDays);
    eta.innerHTML = `
        <h5>${weekdays[shipOutOnWeekDay]}, 9AM - 11AM</h5>
        <h5>${month + 1}/${dates + processingDays}</h5>
    `;
} else {
    shippingDate = weekday + processingDays;
    eta.innerHTML = `
        <h5>${weekdays[shipOutOnWeekDay]}, 9AM - 11AM</h5>
        <h5>${month + 1}/${dates + processingDays}</h5>
    `;
}

// Delivery info: ------------------------------------------------------


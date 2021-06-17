let totalItemsAmount = null;
let shippingAmount = null;

let grandTotalAmountDisplay = document.querySelector(
    ".grandTotalAmountDisplay"
);

shippingAmount = JSON.parse(sessionStorage.getItem("shippingAmount"));
totalItemsAmount = JSON.parse(sessionStorage.getItem("totalItemsAmount"));
let grandTotalAmountWithShipping = shippingAmount + totalItemsAmount;

grandTotalAmountDisplay.innerHTML = `<strong font-bold> $${grandTotalAmountWithShipping}</strong>`;
// ---------------------------

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
    processingDays = 3; //processing Monday for shipping on Wednesday
    shipOutOnWeekDay = 3; // Wednesday
    eta.innerHTML = `
        <h5>${weekdaysArray[shipOutOnWeekDay]}, 9AM - 11AM</h5>
        <h5>${month + 1}/${calendarNumericalDay + processingDays}</h5>
    `;
} else if (weekday == 6) {
    // Saturday orders:
    processingDays = 4; //processing Monday for shipping on Wednesday
    shipOutOnWeekDay = 3; // Wednesday
    eta.innerHTML = `
        <h5>${weekdaysArray[shipOutOnWeekDay]}, 9AM - 11AM</h5>
        <h5>${month + 1}/${calendarNumericalDay + processingDays}</h5>
    `;
} else if (weekday == 4) {
    // Thursday orders:
    processingDays = 4; //processing Thursday for shipping on Monday
    shipOutOnWeekDay = 1; // Monday
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

// Cart Details: -----------------------------------------------------

let ssproducts = sessionStorage.getItem("products");
ssproducts = JSON.parse(ssproducts);

let results = ssproducts.filter((el) => {
    return el.inCart > 0;
});

let cartItemsDisplayThankYou = document.querySelector(
    ".cartItemsDisplayThankYouPage"
);

Object.values(results).map((items) => {
    cartItemsDisplayThankYou.innerHTML += `     
            <div class="col-6 col-md-1 col-lg-1 ">
                <img src="${items.image}" height="40">
            </div>
            <div class="col-6 col-md-5 col-lg-5 ">
                <h4 class="mqSmall-robert">${items.name}</h4>
            </div>
            <div class="col-4 col-md-12 col-lg-2">
                <h4 class="mqSmall-robert"> ${items.inCart}</h4></div>
            <div class="col-4 col-md-4 col-lg-4">
                <div class="row">
                    <div class="col-4 col-md-12 col-lg-12">
                        <h4 class="mqSmall-robert"> $${(
                            items.inCart * items.price
                        ).toFixed(2)}</h4>
                    </div>
                    <div class="col-4 col-md-12 col-lg-12 pb-4">
                        <h5 class="small-bold-letters"> ${items.price.toFixed(
                            2
                        )} / EACH</h5>
                    </div>
                </div>
            </div>
            
            

            `;
});

// ----------------------contact us -----------

let contactUsTel = document.querySelector(".contact-us-tel");

contactUsTel.innerHTML = `
<a href="" onclick="myFunction()">contact us</a>
`;

function myFunction(params) {
    alert("Please contact us at Tel# 999-999-9999  or  email to: @yahoo.com");
}

// ----------------- track delivery -------------

let trackDelivery = document.querySelector(".track-delivery");

trackDelivery.innerHTML = `
<div onclick="myFunctionTrackDelivery()">Delivery Information</div>

`;

function myFunctionTrackDelivery(params) {
    alert("Shipping Via FedEx Service: Tracking# 999-9999-999");
}

// -------------------- button - virtual - gift -----------------

let btnVirtualGift = document.querySelector(".btn-virtual-gift");

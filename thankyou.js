//   ***Notice that below code will reset incart to zero automatically upon leaving page.
// document.addEventListener("DOMContentLoaded", () => {
//     let thankYouPageClass = new ThankYouPageClass();

//     thankYouPageClass.resetCartItemsToZeroFinal();
// });

let totalItemsAmount = null;
let shippingAmount = null;

let grandTotalAmountDisplay = document.querySelector(
    ".grandTotalAmountDisplay"
);

shippingAmount = JSON.parse(sessionStorage.getItem("shippingAmount"));
totalItemsAmount = JSON.parse(sessionStorage.getItem("totalItemsAmount"));
let grandTotalAmountWithShipping = shippingAmount + totalItemsAmount;

grandTotalAmountDisplay.innerHTML = `<strong font-bold> $${grandTotalAmountWithShipping.toFixed(
    2
)}</strong>`;
// ---------------------------

let date = new Date();

let month = date.getMonth();
let calendarNumericalDay = date.getDate();

let processingDays = "null";

let weekdaysArray = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

let mailOutOnDateBinding = document.querySelector(".mailOutOnDateBinding");

// Adding processing days to calendar date.

// Delivery Dates: -------------------------------------------------------

processingDays = JSON.parse(sessionStorage.getItem("ShippingDays"));
// Adding local storage "ShippingDays" to calender

date.setDate(processingDays + calendarNumericalDay);
//date.setDate(32); // for testing specific days
console.log(date);
//0-Sunday ... Saturday-6

let mailOutOnDay = null;

if (date.getDay() == 0) {
    console.log("***This is Weekend (Sunday)");
    date.setDate(date.getDate() + 1);
    console.log("Will be mailed out on: ", date);
} else if (date.getDay() == 6) {
    console.log("***This is Weekend (Saturday)");
    date.setDate(date.getDate() + 2);
    console.log("Will be mailed out on: ", date);
} else {
    console.log("This is a week Day");
    mailOutOnDay = date.getDate();
    console.log("Will be mailed out on: ", date);
}

//

mailOutOnDateBinding.innerHTML = `<h5>${
    weekdaysArray[date.getDay()]
}, 9AM - 11AM</h5>
<h5>${date.getMonth() + 1}/${date.getDate()}</h5> `;
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
            <div class="col-sm-4 col-md-2 col-lg-2">
                <img src="${items.image}" height="40">
            </div>
            <div class="col-sm-4 col-md-2 pl-5rem col-lg-4 ">
                <h4 class="mqSmall-robert">${items.name}</h4>
            </div>
            <div class="col-sm-4 col-md-2 col-lg-2">
                <h4 class="mqSmall-robert"> ${items.inCart}</h4></div>
            <div class="col-sm-12 col-md-6 col-lg-3">
                <div class="row">
                    <div class="col-sm-12 col-md-12 col-lg-12">
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

// -----Master reset button in Navigation ---------

let resetCartItemsToZeroButton = document.querySelector(
    ".resetCartItemsToZeroButton"
);

let exampleFormControlSelect1Binding = document.getElementById(
    ".exampleFormControlSelect1"
);

resetCartItemsToZeroButton.innerHTML = `
<div onclick="resetCartItemsToZeroFunction()">Restart Order</div>
`;

function resetCartItemsToZeroFunction() {
    let products = JSON.parse(sessionStorage.getItem("products"));
    products.forEach((el) => {
        el.inCart = 0;
    });
    sessionStorage.setItem("products", JSON.stringify(products));
    if (sessionStorage["exampleFormControlSelect1"]) {
        // if exampleFormControlSelect1 is set
        sessionStorage["exampleFormControlSelect1"] = null; // set the value
    }
    document.location.href = "../index.html";

    // console.log(products); // shows that products in cart are all zero
}

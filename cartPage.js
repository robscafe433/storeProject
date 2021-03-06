document.addEventListener("DOMContentLoaded", () => {
    const mainCartPageClass = new MainCartPageClass();

    mainCartPageClass.subtractItemFromCart();
    mainCartPageClass.addItemToCart();
    mainCartPageClass.deleteCartItem();

    mainCartPageClass.shippingAmount();
});

let totalCartItems = 0;
let totalItemsAmount = 0;
let shippingAmount = 0;
let shippingDays = 0;

let cartItemsDisplay = document.querySelector(".cart-Display");

let cartBtnUpperRightHand = document.querySelector(".cartBtnUpperRightHand");
let totalItemsAmountDisplay = document.querySelector(
    ".totalItemsAmountDisplay"
);
let totalNumberItemsDisplayLeftSide = document.querySelector(
    ".totalNumberItemsDisplayLeftSide"
);
let totalNumberItemsDisplayRightSide = document.querySelector(
    ".totalNumberItemsDisplayRightSide"
);

let grandTotalAmountDisplay = document.querySelector(
    ".grandTotalAmountDisplay"
);

let ssproducts = sessionStorage.getItem("products");
ssproducts = JSON.parse(ssproducts);

ssproducts.map((items) => {
    totalCartItems += items.inCart;
    sessionStorage.setItem("totalCartItems", JSON.stringify(totalCartItems));
});

let results = ssproducts.filter((el) => {
    return el.inCart > 0;
});

results.map((items) => {
    totalItemsAmount += items.inCart * items.price;
    if (sessionStorage.getItem("shippingAmount")) {
        shippingAmount = JSON.parse(sessionStorage.getItem("shippingAmount"));
        let grandTotalWithShipping = totalItemsAmount + shippingAmount;

        grandTotalAmountDisplay.innerHTML = `
      $${grandTotalWithShipping.toFixed(2)}
      `;
    }

    sessionStorage.setItem(
        "totalItemsAmount",
        JSON.stringify(totalItemsAmount)
    );
});

totalNumberItemsDisplayLeftSide.innerHTML = `
    Items ${totalCartItems}
  `;

totalNumberItemsDisplayRightSide.innerHTML = `
    Items ${totalCartItems}
  `;

cartBtnUpperRightHand.innerHTML = `
  <ion-icon name="cart-outline"></ion-icon>
    ${totalCartItems}
    `;

totalItemsAmountDisplay.innerHTML = `
    $${totalItemsAmount.toFixed(2)}
    `;

Object.values(results).map((items) => {
    cartItemsDisplay.innerHTML += `     
            <div class="col-6 col-md-6 col-lg-1 ">
                <img src="${items.image}" height="40">
            </div>
            <div class="col-6 col-md-6 col-lg-2 pt-4 pt-lg-0">
                <h4 class="mqSmall-robert">${items.name}</h4>
            </div>
            <div class="col-6 my-2 col-md-6 col-lg-4 pb-4 align-self-center">
                <div class="input-group w-75 px-1 mt-n3">
                    <div class="input-group-prepend">
                        <button class="btn btn-outline-secondary px-2 subtract-btn"   data-id=${
                            items.id
                        } data-name=${items.name} type="button">
                            -
                        </button>
                    </div>
                    <input type="text" class="form-control" placeholder="Qty"     value="${
                        items.inCart
                    }" aria-label="Quantity" aria-describedby="basic-addon1">
                    <div class="input-group-prepend">
                        <button class="btn btn-outline-secondary px-2 add-btn"    data-id=${
                            items.id
                        } data-name=${items.name}type="button">
                            +
                        </button>
                    </div>
                </div>
            </div>

            <div class="col-4 col-md-4 col-lg-2">
                <h4 class="mqSmall-robert"> @${items.price.toFixed(2)}</h4>
            </div>
            

            <div class="col-2 col-md-2 col-lg-3">
                <h4> <ion-icon size="large" name="close-circle-outline"   class="delete-btn btn-outline-secondary" data-id=${
                    items.id
                } data-name=${items.name}type="button"></ion-icon></h4>
            </div>

            `;
});

class MainCartPageClass {
    addItemToCart() {
        let products = JSON.parse(sessionStorage.getItem("products"));
        const addItemBtn = [...document.querySelectorAll(".add-btn")];

        addItemBtn.forEach((button) => {
            let id = button.dataset.id;

            button.addEventListener("click", (e) => {
                console.log(id);

                let specificFoundProduct = products.find(
                    (products) => products.id == id
                );

                console.log(specificFoundProduct);
                specificFoundProduct.inCart += 1;
                console.log(products);

                sessionStorage.setItem("products", JSON.stringify(products));

                location.reload();
            });
        });
    }

    subtractItemFromCart() {
        let products = JSON.parse(sessionStorage.getItem("products"));
        const subtractItemBtn = [...document.querySelectorAll(".subtract-btn")];

        subtractItemBtn.forEach((button) => {
            let id = button.dataset.id;

            button.addEventListener("click", (e) => {
                console.log(id);

                let specificFoundProduct = products.find(
                    (products) => products.id == id
                );

                console.log(specificFoundProduct);
                specificFoundProduct.inCart -= 1;

                sessionStorage.setItem("products", JSON.stringify(products));
                location.reload();
            });
        });
    }

    deleteCartItem() {
        let products = JSON.parse(sessionStorage.getItem("products"));
        const deleteButtons = [...document.querySelectorAll(".delete-btn")];

        deleteButtons.forEach((button) => {
            let id = button.dataset.id;

            button.addEventListener("click", (e) => {
                console.log("delete button has been clicked");
                console.log(id);
                let specificFoundProduct = products.find(
                    (products) => products.id == id
                );

                specificFoundProduct.inCart = 0;

                sessionStorage.setItem("products", JSON.stringify(products));
                location.reload();
            });
        });
    }

    shippingAmount() {
        // calculates shipping amount and stores it to local storage
        document
            .querySelector("#exampleFormControlSelect1")
            .addEventListener("change", function () {
                shippingAmount = document.querySelector(
                    "#exampleFormControlSelect1"
                ).value;
                shippingAmount = parseFloat(shippingAmount);
                console.log(shippingAmount);
                sessionStorage.setItem(
                    "shippingAmount",
                    JSON.stringify(shippingAmount)
                );
                if (shippingAmount == 0) {
                    //console.log("Six business days");
                    sessionStorage.setItem("ShippingDays", 6);
                } else if (shippingAmount == 13.98) {
                    //console.log("Four business days");
                    sessionStorage.setItem("ShippingDays", 4);
                } else if (shippingAmount == 22.98) {
                    //console.log("Two business days");
                    sessionStorage.setItem("ShippingDays", 2);
                } else if (shippingAmount == 32.98) {
                    //console.log("One business days");
                    sessionStorage.setItem("ShippingDays", 1);
                }
                //alert("Pause");
                location.reload();
            });
    }
}

// Saving shipping value in storage
document.addEventListener("DOMContentLoaded", () => {
    let formSelection = document.getElementById("exampleFormControlSelect1");

    if (sessionStorage["exampleFormControlSelect1"]) {
        // if exampleFormControlSelect1 is set
        formSelection.value = sessionStorage["exampleFormControlSelect1"]; // set the value
    }

    formSelection.onchange = function () {
        sessionStorage["exampleFormControlSelect1"] = this.value; // change sessionStorage on change
    };
});


// Saving shipping value in storage
document.addEventListener("DOMContentLoaded", () => {
    let formSelection = document.getElementById("exampleFormControlSelect1");
    let checkoutBtn = document.getElementById("checkoutButton");
    if (sessionStorage["exampleFormControlSelect1"]) {
        // if exampleFormControlSelect1 is set
        formSelection.value = sessionStorage["exampleFormControlSelect1"]; // set the value
    }

    formSelection.onchange = function () {
        sessionStorage["exampleFormControlSelect1"] = this.value; // change sessionStorage on change
    };
    // enabling and disabling checkout button
    if (formSelection.value === "null") {
        checkoutBtn.disabled = true;
    } else {
        checkoutBtn.disabled = false;
    }
});

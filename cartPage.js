document.addEventListener("DOMContentLoaded", () => {
  let path = window.location.pathname;
  let pageFile = path.split("/").pop();
  let pageName = pageFile.split(".")[0];
  let totalCartItems = 0;
  let totalItemsAmount = 0;
  let cartPage = document.querySelector(".cart-Page");

  const productspa = new Products();
  const mainclass = new MainClass();

  // below .getJsonData() function call returns filtered array, passes array to displayProducts() function.

  productspa
    .getJsonData(pageName)
    .then((products) => {
      mainclass.displayProducts(products);

      Storage.saveProducts(products);
    })
    .then(() => {
      mainclass.getBagButtons();
      mainclass.deleteCartItem();
      mainclass.addItemToCart();
      mainclass.subtractItemFromCart();
      if (cartPage) {
        mainclass.grandTotalAmount();
      }
    });

  let secondRowPA = document.querySelector(".second-row-PA");

  let cartBtnUpperRightHand = document.querySelector(".cartBtnUpperRightHand");
  let totalItemsAmountDisplay = document.querySelector(
    ".totalItemsAmountDisplay"
  );
  let totalCartItemsDisplayLeftSide = document.querySelector(
    ".totalCartItemsDisplayLeftSide"
  );
  let totalCartItemsDisplayRightSide = document.querySelector(
    ".totalCartItemsDisplayRightSide"
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

  console.log(results);

  if (cartPage) {
    results.map((items) => {
      totalItemsAmount += items.inCart * items.price;
      if (sessionStorage.getItem("grandTotalAmount")) {
        grandTotalAmount = JSON.parse(
          sessionStorage.getItem("grandTotalAmount")
        );
        console.log(
          "Grand total is here: ",
          totalItemsAmount + grandTotalAmount
        );
        grandTotalAmountDisplay.innerHTML = `
          $${totalItemsAmount + grandTotalAmount}
          `;
      }
      console.log("iteration");
      console.log(totalItemsAmount);
      console.log(grandTotalAmount);
      sessionStorage.setItem(
        "totalItemsAmount",
        JSON.stringify(totalItemsAmount)
      );
    });

    totalCartItemsDisplayLeftSide.innerHTML = `
        Items ${totalCartItems}
      `;

    totalCartItemsDisplayRightSide.innerHTML = `
        Items ${totalCartItems}
      `;

    cartBtnUpperRightHand.innerHTML = `
      <ion-icon name="cart-outline"></ion-icon>
        ${totalCartItems}
        `;

    totalItemsAmountDisplay.innerHTML = `
        $${totalItemsAmount}
        `;

    Object.values(results).map((items) => {
      secondRowPA.innerHTML += ` 
              <div class="col-3 second-row-PA  ">
                  <img src="${items.image}" height="40">
              </div>
              <div class="col-3 second-row-PA ">
                  <h4>${items.name}</h4>
              </div>
              <div class="col-3 align-self-center second-row-PA ">
                  <div class="input-group w-75 px-1 mb-1">
                      <div class="input-group-prepend">
                          <button class="btn btn-outline-secondary px-2 subtract-btn" data-id=${items.id} data-name=${items.name} type="button">
                              -
                          </button>
                      </div>
                      <input type="text" class="form-control" placeholder="Qty" value="${items.inCart}" aria-label="Quantity" aria-describedby="basic-addon1">
                      <div class="input-group-prepend">
                          <button class="btn btn-outline-secondary px-2 add-btn" data-id=${items.id} data-name=${items.name}type="button">
                              +
                          </button>
                      </div>
                  </div>
              </div>
                                  
              <div class="col-3 second-row-PA">
                  <h4><span class="iconify delete-btn" data-id=${items.id} data-name=${items.name} data-icon="ion-close-circle-outline" data-inline="false" height="30"></span></h4>
              </div>
                                 
              `;
    });
  } else {
    cartBtnUpperRightHand.innerHTML = `
      <ion-icon name="cart-outline"></ion-icon>
        ${totalCartItems}
        `;
  }
});

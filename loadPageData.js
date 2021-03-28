document.addEventListener("DOMContentLoaded", () => {
  let path = window.location.pathname;
  let pageFile = path.split("/").pop();
  let pageName = pageFile.split(".")[0];
  let totalCartItems = 0;

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
    });

  let cartPage = document.querySelector(".cart-Page");
  let cartTotalPA = document.querySelector(".cart-totalPA");
  let secondRowPA = document.querySelector(".second-row-PA");
  let thirdRowPA = document.querySelector(".third-row-PA");
  let cartBtnUpperRightHand = document.querySelector(".cartBtnUpperRightHand");

  let ssproducts = sessionStorage.getItem("products");
  ssproducts = JSON.parse(ssproducts);

  ssproducts.map((items) => {
    totalCartItems += items.inCart;
  });

  let results = ssproducts.filter((el) => {
    return el.inCart > 0;
  });

  //   console.log(results);
  //   console.log(totalCartItems);

  if (cartPage) {
    cartBtnUpperRightHand.innerHTML = `
    <ion-icon name="cart-outline"></ion-icon>
      ${totalCartItems}
      `;

    Object.values(results).map((items) => {
      console.log("Inside MAP ***", items, items.name);
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
      ${totalCartItems}
      `;
  }
});

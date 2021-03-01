document.addEventListener("DOMContentLoaded", () => {
    let path = window.location.pathname;
    let pageFile = path.split("/").pop();
    let pageName = pageFile.split(".")[0];

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
        });

    let cartTotalPA = document.querySelector(".cart-totalPA");
    let secondRowPA = document.querySelector(".second-row-PA");
    let thirdRowPA = document.querySelector(".third-row-PA");
    let totalCartItemsDisplay = document.querySelector(".cart");

    if (totalCartItemsDisplay) {
        let totalCartItems = sessionStorage.getItem("totalCartItems");
        totalCartItems = JSON.parse(totalCartItems);

        totalCartItemsDisplay.innerHTML = `
  ${totalCartItems}
  `;
    }

    if (cartTotalPA) {
        let cartItemsPA = sessionStorage.getItem("products");
        cartItemsPA = JSON.parse(cartItemsPA);
        let masterTotalCartAmount = sessionStorage.getItem(
            "masterTotalCartAmount"
        );
        masterTotalCartAmount = JSON.parse(masterTotalCartAmount);

        let results = cartItemsPA.filter((el) => {
            return el.inCart > 0; // el means element and then.key
            // which the key is "category"
        });

        let masterTotalItemCount = cartItemsPA.filter((el) => {
            return el.inCart > 0; // el means element and then.key
            // which the key is "category"
        });

        console.log(results);
        console.log(masterTotalItemCount);

        Object.values(results).map((items) => {
            secondRowPA.innerHTML += `
          <div class="row two-rs font-size-rs">
          <div class="col-2 border"><img src="${items.image}" height="40"></div>
          <div class="col-3 border">
          <ion-icon class="test1 remove" data-name="${
              items.name
          }"  name="close-circle-outline"></ion-icon>${items.name}</div>
          <div class="col-2 border">${items.price.toFixed(2)}</div>
          <div class="col-2 border"><ion-icon name="add-circle-outline"></ion-icon> ${
              items.inCart
          } <ion-icon name="remove-circle-outline"></div>
          <div class="col-3 border">${(items.price * items.inCart).toFixed(
              2
          )}</div>
        </div>
    
          `;
        });

        thirdRowPA.innerHTML += `
  <div class="row three-rs font-size-rs">
  <div class="col-7"></h4></div>
  <div class="col-2">Basket Total: </div>
 
  </div>
  `;
    }
});

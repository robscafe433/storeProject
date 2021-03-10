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
            mainclass.deleteCartItem();
            mainclass.addItemToCart();
            mainclass.subtractItemFromCart();
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
            //console.log(items);
            secondRowPA.innerHTML += ` <div class="col-3">
            <img
                class="p-4 card-hoverImg"
                src="${items.image}"
            />
        </div>
        <div class="col-3 align-self-center">
            <h4>${items.name}</h4>
        </div>
        <div class="col-3 align-self-center">
            <div class="input-group w-75 px-1 mb-1">
                <div class="input-group-prepend">
                    <button
                        class="subtract-btn btn btn-outline-secondary px-2"
                        data-id=${items.id}
                        data-name="${
                            items.name
                        }"
                        type="button"
                        name="remove-circle-outline"
                    >
                        -
                    </button>
                </div>
                <input
                    type="text"
                    class="form-control"
                    placeholder="${items.inCart}"
                    aria-label="Quantity"
                    aria-describedby="basic-addon1"
                />
                <div class="input-group-prepend">
                    <button
                        class="add-btn btn btn-outline-secondary px-2"
                        type="button"
                        data-id=${items.id}
                        data-name="${items.name}"
                        name="add-circle-outline"
                    >
                        +
                    </button>
                </div>
            </div>
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

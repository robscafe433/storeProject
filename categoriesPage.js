document.addEventListener("DOMContentLoaded", () => {
  let path = window.location.pathname;
  let pageFile = path.split("/").pop();
  let pageName = pageFile.split(".")[0];

  const getJSONProductsClass = new GetJSONProductsClass();
  const mainCategoriesPageClass = new MainCategoriesPageClass();

  getJSONProductsClass
    .getJsonData(pageName)
    .then((products) => {
      mainCategoriesPageClass.displayProducts(products);

      Storage.saveProducts(products);
    })
    .then(() => {
      mainCategoriesPageClass.clickPageProducts();
    });
});

let categoriesPageGalleryButtons = [];
let chosenItemsArray = [];

class MainCategoriesPageClass {
  displayProducts(products) {
    let results = "";
    let cartPage = document.querySelector(".cart-Page");

    products.forEach((prod) => {
      results += `
            <div class="card m-4 gallery-card">
                <img class="card-img-top" src=${prod.image}>
                <div class="card-body">
                    <h5 class="card-title text-center">${prod.name}</h5>
                    <p class="card-text text-center">$${prod.price}</p>
                    <a class="add-cart" href="#" class="" data-id=${prod.id} class="btn btn-primary">Add to Cart</a>  
                </div>
            </div>
            `;
    });

    let categoriesPageGalleryDisplay = document.querySelector(".gallery");
    categoriesPageGalleryDisplay.innerHTML = results;
  }

  clickPageProducts() {
    const buttons = [...document.querySelectorAll(".add-cart")];

    categoriesPageGalleryButtons = buttons;
    buttons.forEach((button) => {
      let id = button.dataset.id;

      button.addEventListener("click", (event) => {
        event.target.innerText = "In Cart";

        Storage.addsOneToProductsInCart(id);

        location.reload();
      });
    });
  }
}

let tempProducts = "";

class Storage {
  static saveProducts(prod) {
    if (sessionStorage.getItem("products")) {
      tempProducts = JSON.parse(sessionStorage.getItem("products"));

      let iterations = 0;

      let found = tempProducts.some((obj, index) => {
        iterations++;
        if (obj.id === prod[0].id) {
          return true;
        }
      });

      if (found == false) {
        tempProducts.push(...prod);

        sessionStorage.setItem("products", JSON.stringify(tempProducts));
      }
    } else {
      sessionStorage.setItem("products", JSON.stringify(prod));
      //added location.reload()  to remove a console error message.
      location.reload();
    }
  }

  static addsOneToProductsInCart(id) {
    let products = JSON.parse(sessionStorage.getItem("products"));

    let specificFoundProduct = products.find((products) => products.id == id);
    specificFoundProduct.inCart += 1;
    sessionStorage.setItem("products", JSON.stringify(products));
  }
}

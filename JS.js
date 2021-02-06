let chosenItemsArray = [];
let buttonsDOM = [];
let masterId = "";

class Products {
  async getJsonData(pageName) {
    try {
      let result = await fetch("../items.json");
      let data = await result.json();
      let products = data.items;

      let selectedCategory = pageName;
      let results = products.filter((el) => {
        return el.category === selectedCategory;
      });

      return results[0].products;

      /*** TODO: Need to store data with session storage. ***/
      if (!sessionStorage.getItem("products")) {
        return results[0].products;
        console.log(results[0].products);
      } else {
        return JSON.parse(sessionStorage.getItem("products"));
      }
    } catch (error) {
      console.log(error);
    }
  }
}
class MainClass {
  displayProducts(products) {
    let results = "";
    let idmaster = "";

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

      idmaster = prod.id;
    });

    let productsDOM = document.querySelector(".gallery");

    if (productsDOM) {
      productsDOM.innerHTML = results;
    }
  }

  getBagButtons() {
    let cartdisplay = "";
    const buttons = [...document.querySelectorAll(".add-cart")];

    buttonsDOM = buttons;
    buttons.forEach((button) => {
      let id = button.dataset.id;

      button.addEventListener("click", (event) => {
        event.target.innerText = "In Cart";

        let individualCartItem = Storage.getProducts(id);

        let cartItem = { ...individualCartItem };

        //***    Important: the next code was needed so as to not overwrite data in the local storage when going back to the household.html page. This was needed because the global variable "chosenItemsArray" starts at zero EVERY TIME the page is loaded.

        if (sessionStorage.getItem("ChosenProducts")) {
          console.log("We now have Chosen Products ********");

          chosenItemsArray = sessionStorage.getItem("ChosenProducts");
          chosenItemsArray = JSON.parse(chosenItemsArray);
          chosenItemsArray = [...chosenItemsArray, cartItem];

          this.setCartValues(chosenItemsArray);
        } else {
          console.log("There is NOTHING in the Local Storage yet: 000");

          chosenItemsArray = [...chosenItemsArray, cartItem];
          this.setCartValues(chosenItemsArray);
        }
      });
    });
  }

  // The below function uses all objects in the global variable "chosenItemsArray" (an array which holds all the objects clicked on and uses all to calculate total items and total amount).

  setCartValues(chosenItemsArray) {
    let masterTotal = 0;
    let totalCartItems = 0;

    console.log(chosenItemsArray);

    chosenItemsArray.map((item) => {
      masterTotal += item.price * item.inCart;
      sessionStorage.setItem(
        "masterTotalCartAmount",
        JSON.stringify(masterTotal)
      );

      totalCartItems += item.inCart;
    });

    sessionStorage.setItem("totalCartItems", JSON.stringify(totalCartItems));

    Storage.itemsChosen(chosenItemsArray);
  }
}

//
class Storage {
  static saveProducts(prod) {
    sessionStorage.setItem("products", JSON.stringify(prod));
  }

  static getProducts(id) {
    let products = JSON.parse(sessionStorage.getItem("products"));
    let ChosenProducts = JSON.parse(sessionStorage.getItem("ChosenProducts"));

    // below code pulls an individual object from local storage "products" with every click event and adds 1 to that specific object's "inCart" then re-saves "products" to the local storage. So this overwrites "products" in local storage.

    let specificFoundProduct = products.find((products) => products.id == id);

    specificFoundProduct.inCart += 1;

    sessionStorage.setItem("products", JSON.stringify(products));

    // below code is needed to keep individual object's "inCart" at "one" every time and stores it to local storage "ChosenProducts". This was needed for future math calculations. Sends "ChosenProducts" to setCartValues function to do math calculations.

    if (sessionStorage.getItem("ChosenProducts")) {
      let itemAlreadyChosen = ChosenProducts.find(
        (ChosenProducts) => ChosenProducts.id == id
      );

      if (itemAlreadyChosen) {
        return itemAlreadyChosen;
      } else {
        return specificFoundProduct;
      }
    } else {
      return specificFoundProduct;
    }
  }

  static itemsChosen(chosenItemsArray) {
    sessionStorage.setItem("ChosenProducts", JSON.stringify(chosenItemsArray));
    //
  }
}

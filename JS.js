let fCart = document.querySelectorAll(".add-cart");

let products = [
  //Groceries list:
  {
    name: "Carrots",
    tag: "carrots",
    price: 6.0,
    inCart: 0,
  },

  {
    name: "Lettuce",
    tag: "lettuce",
    price: 4.0,
    inCart: 0,
  },

  {
    name: "Tomatoes",
    tag: "tomatoes",
    price: 2.5,
    inCart: 0,
  },

  // Garden list:
  {
    name: "Shovel",
    tag: "shovel",
    price: 4.0,
    inCart: 0,
  },

  {
    name: "Fertilizer",
    tag: "fertilizer",
    price: 5,
    inCart: 0,
  },

  {
    name: "Rake",
    tag: "rake",
    price: 6,
    inCart: 0,
  },

  // Household list

  {
    name: "Clorox",
    tag: "clorox",
    price: 2,
    inCart: 0,
  },

  {
    name: "Paper Towels",
    tag: "paper-towels",
    price: 3,
    inCart: 0,
  },

  {
    name: "Batteries",
    tag: "batteries",
    price: 2,
    inCart: 0,
  },
];

//-------below code now uses .json instead of above list ----------------------

//let cartTotalPA = document.querySelector(".cart-totalPA");
// let cartItemsPA = document.querySelector(".cart-items");

//Global Variables
let cartPA = [];
let buttonsDOM = [];
let masterId = "";

class ProductsPS {
  async getProducts() {
    try {
      let result = await fetch("../items.json");
      let data = await result.json();
      let products2 = data.items; // .items is needed as this is the array being
      // stored in products2

      let selectedCategory = "household";
      let results = products2.filter((el) => {
        return el.category === selectedCategory; // el means element and then.key
        // which the key is "category"
      });
      //return results[0].products;
      //console.log(">>>Line 90", results);

      // for (let i = 0; i < 2; i++) {
      //   return products2[i].products;
      // }

      // new code goes here 01/02/21

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
class UIPA {
  displayProducts(products) {
    //console.log("Line 103 Inside displayProducts function", products);

    let results = "";
    let idmaster = "";

    products.forEach((prod) => {
      //console.log(">>>Now inside for each", prod);
      results += `
      <div class="card m-4 grocery-card">
          <img class="card-img-top" src=${prod.image}>
          <div class="card-body">
              <h5 class="card-title text-center">${prod.name}</h5>
              <p class="card-text text-center">$${prod.price}</p>
              <a class="add-cart" href="#" class="" data-id=${prod.id} class="btn btn-primary">Add to Cart</a>  
          </div>
      </div>
      `;

      idmaster = prod.id;
      //console.log("Idmaster is: ", idmaster);

      //
    });

    let productsDOM = document.querySelector(".household-gallery");

    if (productsDOM) {
      productsDOM.innerHTML = results;
    }
  }

  getBagButtons() {
    let cartdisplay = "";
    const buttons = [...document.querySelectorAll(".add-cart")];

    //console.log("Line 131", buttons);

    buttonsDOM = buttons;
    buttons.forEach((button) => {
      let id = button.dataset.id;

      //console.log("line 143 - showing id: ", id, "Type of id", typeof id);
      //Note above line shows all ids in the array passed, because displaying id only

      button.addEventListener("click", (event) => {
        //  console.log("This is cartPA2: ", cartPA2);
        //console.log("This is cartPA : ", cartPA);
        // console.log("*************", cartPA2.length);
        // console.log(
        //   "This is the local storage : ",
        //   localStorage.getItem("ChosenProducts")
        // );
        //cartPA = localStorage.getItem("");
        //console.log("Line 160", cartPA);
        //console.log(event); //*** Notice that this is event specific to button
        // clicked event, specific to element clicked-rs so gives me
        // ALL the info on "ONLY" that element clicked.
        event.target.innerText = "In Cart";

        // get product from products
        let individualCartItem = Storage.getProducts(id);

        /////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        if (individualCartItem != null) {
          //individualCartItem.inCart += 1;

          let cartItem = { ...individualCartItem, amount: 1 };
          //console.log("The id is:  ", id);
          //console.log("This is Line 178 : ", cartItem); // cartItem stores individual objects one at a time, so another click of button will send the object that corresponds to that click and cartItem will be overwritten.
          //console.log("Line 162 cartPA is: ", cartPA);
          if (sessionStorage.getItem("ChosenProducts")) {
            console.log("We now have Chosen Products ********");
            //    ***    Important: the next code was needed so as to not overwrite data
            cartPA = sessionStorage.getItem("ChosenProducts");
            cartPA = JSON.parse(cartPA);
            cartPA = [...cartPA, cartItem];
            //console.log("This is line 185", cartPA);
            this.setCartValues(cartPA);

            //
          } else {
            console.log("There is NOTHING in the Local Storage yet: 000");
            //individualCartItem.inCart += 1;
            cartPA = [...cartPA, cartItem];
            this.setCartValues(cartPA);
          }
        }

        //cartPA = [...cartPA, cartItem]; // *** The spread operator will spread the array into its "individual" components, whatever they be: strings,numbers,objects, etc... see log output of ...cartPA-rs
        //console.log("Line 164 cartPA is:  ", cartPA);
        //console.log("&*&* ...cartPA is: ", ...cartPA);
        // add product to the cart

        // save cart in the local storage (Session Storage)
        //this.setCartValues(cartPA);
        //Storage.saveCart(cartPA);

        // set cart values
        // this.setCartValues(cartPA);
        // display cart items
        // show the cart

        //console.log(">>>", id);
        //This block of code is rerun every time click event occurs
        //............get product from products
      });
    });
  }
  setCartValues(cartPA2) {
    //console.log("How many objects in cartPA : ", cartPA2); // cartPA receives
    // an array of one or more objects, but it is an array: [{...}]
    // second click of item I get : (2) [{...},{...}]  for cartPA-rs
    //console.log("Line 188", ...cartPA2);
    let masterTotal = 0;
    let totalCartItems = 0;
    //let counter = 1;

    // try using a function that sends data to global variables or to
    // on load?
    cartPA2.map((item) => {
      // So this is like a for loop which iterates number of times as the objects in the array.
      //console.log("counter is: ", counter);
      //item.inCart = item.inCart + item.amount;
      console.log(item);
      //counter++;

      masterTotal += item.price * item.inCart;
      sessionStorage.setItem(
        "masterTotalCartAmount",
        JSON.stringify(masterTotal)
      );
      totalCartItems += item.inCart;
      console.log("tempTotal inside loop is: ", masterTotal);
    });
    console.log("Now Outside of item Loop ??? ");

    // console.log(tempTotal);
    console.log(totalCartItems);
    sessionStorage.setItem("totalCartItems", JSON.stringify(totalCartItems));
    //localStorage.setItem("NumberOfItems", itemsTotal);
    // console.log("Line 198", itemsTotal);
    //console.log("Line 198 Typeof is: ", typeof itemsTotal);
    Storage.saveCart(cartPA2);
  }
}

//
class Storage {
  static saveProducts(prod) {
    //cartPA = prod; //saves filtered array into global variable cartPA.
    //console.log(cartPA);

    sessionStorage.setItem("products", JSON.stringify(prod));
  }

  static getProducts(id) {
    let products = JSON.parse(sessionStorage.getItem("products"));
    let ChosenProducts = JSON.parse(sessionStorage.getItem("ChosenProducts"));
    // console.log(
    //   "This should be parsed array [{...},{...},etc...] :  ",
    //   products
    // );

    let specificFoundProduct = products.find((products) => products.id == id);

    //below cods are to show that individual object is pulled from array with click event id and adds 1 to that specific object's "inCart":

    //testing before and after:

    console.log(specificFoundProduct, specificFoundProduct.inCart);

    // This is where 1 is added to the specific object:
    specificFoundProduct.inCart += 1;

    //Replaces original BLS "products" array with new data:
    sessionStorage.setItem("products", JSON.stringify(products));

    console.log(specificFoundProduct, specificFoundProduct.inCart);
    console.log(products);

    //code to determine if product already chosen, if so then return null.

    if (sessionStorage.getItem("ChosenProducts")) {
      let itemAlreadyChosen = ChosenProducts.find(
        (ChosenProducts) => ChosenProducts.id == id
      );
      if (itemAlreadyChosen) {
        console.log("Found Something");

        //This does not return object.
        return itemAlreadyChosen;
      } else {
        return specificFoundProduct;
      }
    } else {
      // findReturn.inCart += 1;

      return specificFoundProduct;
    }
  }

  static saveCart(arraycartPA) {
    // console.log(
    //   "Now line 222 which TypeOf is : ("
    //   //typeof numberOfItemsParameter
    // );

    //console.log("Line 249 this is arraycartPA: ", arraycartPA);
    sessionStorage.setItem("ChosenProducts", JSON.stringify(arraycartPA));
    //

    let excistingNumberOfItemsParameter = sessionStorage.getItem(
      "NumberOfItems"
    );
    // console.log(
    //   "excistingNumberOfItemsParameter is: ",
    //   excistingNumberOfItemsParameter
    // );
    if (excistingNumberOfItemsParameter === null) {
      //sessionStorage.setItem("NumberOfItems", numberOfItemsParameter);
      console.log("Just ran line 235");
      console.log("*********************************************************");
    } else {
    }
  }
}

/* 

------------------------------------------------------------------------------------------------------On  Load -------------------------------------------------------------------------------------


*/
document.addEventListener("DOMContentLoaded", () => {
  const productspa = new ProductsPS();
  const uipa = new UIPA();

  // below .getProducts() function call returns filtered array, passes array to displayProducts() function.

  productspa
    .getProducts()
    .then((products) => {
      //console.log("Line 176 immediately after .then", products);

      //below displayProducts function uses "template-literals (tilda `` ) to dynamically code".

      uipa.displayProducts(products);

      Storage.saveProducts(products);
    })
    .then(() => {
      uipa.getBagButtons();
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
  //
  //
  // If I am in the cart.html page then displays with below code
  if (cartTotalPA) {
    //
    let cartItemsPA = sessionStorage.getItem("products");
    cartItemsPA = JSON.parse(cartItemsPA);
    let masterTotalCartAmount = sessionStorage.getItem("masterTotalCartAmount");
    masterTotalCartAmount = JSON.parse(masterTotalCartAmount);

    //Trying filter to display only items that have been chosen:
    console.log(cartItemsPA);
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
    //  The below displays the cart items in the cart.html page
    //debugger;
    Object.values(results).map((items) => {
      secondRowPA.innerHTML += `
            <div class="row two-rs font-size-rs">
            <div class="col-2 border"><img src="${
              items.image
            }" height="40"></div>
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
    <div class="col-3">$ ${masterTotalCartAmount.toFixed(2)}</div>

    </div>

    `;
  }
});

//

//
//
//
//
//
//

//-----------------------end -----------------------------------------

//

document.querySelector("body").onclick = (e) => {
  //console.log("---------------------------------");
  //console.log(e.target);
};
//console.log(fCart); //this displays the number of links/buttons individually-rs
// because there is a binding to html page on top ->buttons
//let fCart = document.querySelectorAll(".add-cart");
for (let i = 0; i < fCart.length; i++) {
  fCart[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
    //sessionStorageCountIndex();
    //console.log(i);  -> This gets the Index-rs
  });
}

// restores count number on cart if page is reloaded.

function onLoadCartNumbers() {
  let productNumbers = sessionStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector(".cart span").textContent = productNumbers;
  }
}

// Sets number of items in browser's  local Storage starting from 1 when button(s) // is pressed.

function cartNumbers(product) {
  let productNumbers = sessionStorage.getItem("cartNumbers");

  productNumbers = parseInt(productNumbers);
  //console.log("display null???", productNumbers); //displays =NaN

  if (productNumbers) {
    sessionStorage.setItem("cartNumbers", productNumbers + 1);
    // sets home page cart count
    document.querySelector(".cart span").textContent = productNumbers + 1;
  } else {
    sessionStorage.setItem("cartNumbers", 1);

    document.querySelector(".cart span").textContent = 1;

    //Above:
    //**********************************Line 104 was getting bug:
    //"Button" was recently added to index.html but had not been updated to
    //groceries.html nor on my page cart.html.
    //* So I had to add it manually to the nav bar of both pages and also
    //had to include "cart(inside class)" and "span" to the "button",
    //*Note that also the cart page
    //was now not displaying the data, but once I also added the button
    //to nav bar of cart page it worked nicely-rs
  }

  //setItems(product);
}

//Creates the browser local storage  "productsInCart"(which is the
//(key) and sets cartItems which is the array/product.

function setItems(product) {
  let cartItems = sessionStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      //console.log("cartItems is now undefined ***");
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
    //cartItems[product.tag].inCart += 1;
  } else {
    //product.inCart = 1;
    cartItems = {
      [product.tag]: product,
    };
  }

  sessionStorage.setItem("productsInCart", JSON.stringify(cartItems));
  cartItems = sessionStorage.getItem("productsInCart");
  //   //cartItems = JSON.parse(cartItems);
  //console.log(JSON.parse(cartItems)[1]);
}

function totalCost(product) {
  let cartCost = sessionStorage.getItem("totalCost");

  if (cartCost != null) {
    cartCost = parseFloat(cartCost);
    sessionStorage.setItem("totalCost", cartCost + product.price);
  } else {
    sessionStorage.setItem("totalCost", product.price);
    //console.log(sessionStorage.getItem("totalCost", product.price));
    //console.log(typeof sessionStorage.getItem("totalCost", product.price));
  }
}

// function displayCart() {
//   let cartItems = sessionStorage.getItem("productsInCart");
//   cartItems = JSON.parse(cartItems);

//   //let secondRow = document.querySelector(".row-products-rs");

//   let cartCost = sessionStorage.getItem("totalCost");
//   cartCost = parseFloat(cartCost);

//   if (cartItems && secondRow) {
//     Object.values(cartItems).map((item) => {
//       secondRow.innerHTML += `
//       <div class="row two-rs font-size-rs">
//       <div class="col-2 border"><img src="Images/${
//         item.tag
//       }.jpg" height="40"></div>
//       <div class="col-3 border">
//       <ion-icon class="test1 remove" data-name="${
//         item.name
//       }"  name="close-circle-outline"></ion-icon>${item.name}</div>
//       <div class="col-2 border">${item.price.toFixed(2)}</div>
//       <div class="col-2 border"><ion-icon name="add-circle-outline"></ion-icon> ${
//         item.inCart
//       } <ion-icon name="remove-circle-outline"></div>
//       <div class="col-3 border">${(item.price * item.inCart).toFixed(2)}</div>
//     </div>

//       `;
//     });

//     secondRow.onclick = function (e) {
//       if (e.target && e.target.classList.contains("remove")) {
//         console.log("onclick remove - Yeah");
//       }
//     };

//     secondRow.innerHTML += `
//     <div class="row three-rs font-size-rs">
//     <div class="col-7"></h4></div>
//     <div class="col-2">Basket Total:</div>
//     <div class="col-3">$${cartCost.toFixed(2)}</div>

//     </div>

//     `;
//   }
// }

//onLoadCartNumbers();
//displayCart();

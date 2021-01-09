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
      //console.log(">>>Line 90", results);

      // for (let i = 0; i < 2; i++) {
      //   return products2[i].products;
      // }
      return results[0].products;
    } catch (error) {
      console.log(error);
    }
  }
}
class UIPA {
  displayProducts(products) {
    //console.log("Line 103 Inside displayProducts function", products);

    //debugger;  - debugger example
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
        console.log(event); //*** Notice that this is event specific to button
        // clicked event, specific to element clicked-rs so gives me
        // ALL the info on "ONLY" that element clicked.
        //

        console.log(">>>", id);
        //This block of code is rerun every time click event occurs
        //............get product from products
        Storage.getProducts(id);
      });
    });
  }
}

//
class Storage {
  static saveProducts(prod) {
    cartPA = prod; //saves filtered array into global variable cartPA.
    //console.log(cartPA);
  }

  static getProducts(id) {
    let results = "";
    //console.log("Line 169", cartPA, "The id is", id);
    //
    //
    let inCartpa = cartPA.find((item) => item.id == id);
    //console.log("now showing inCartpa line 179", inCartpa);

    //  Below code displays object details in console.
    //
    console.log(inCartpa.name);
    console.log("The price is: $", inCartpa.price);
    console.log("The id is: ", inCartpa.id);

    results += `
      <div>
      <h5>This is the item name: ${inCartpa.name}</h5> 
      
      
      `;

    // const productsDOM2 = document.querySelector(".row-products-rs");
    // if (productsDOM2) {
    //   productsDOM2.innerHTML = results;
    //}
    const productsDOM2 = document.querySelector(".row-products-rs");
    console.log("Cart page loaded ***");
    if (productsDOM2) {
      productsDOM2.innerHTML = results;
    }

    // function init() {
    //   const productsDOM2 = document.querySelector(".row-products-rs");
    //   if (productsDOM2) {
    //     productsDOM2.innerHTML = results;
    //   }
    //}
    //window.onload = init; // youtube vid uses this code to avoid error message.
  }
}

//
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
});

//
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

  setItems(product);
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
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
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

function displayCart() {
  let cartItems = sessionStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  //let secondRow = document.querySelector(".row-products-rs");

  let cartCost = sessionStorage.getItem("totalCost");
  cartCost = parseFloat(cartCost);

  if (cartItems && secondRow) {
    Object.values(cartItems).map((item) => {
      secondRow.innerHTML += `
      <div class="row two-rs font-size-rs">
      <div class="col-2 border"><img src="Images/${
        item.tag
      }.jpg" height="40"></div>
      <div class="col-3 border">
      <ion-icon class="test1 remove" data-name="${
        item.name
      }"  name="close-circle-outline"></ion-icon>${item.name}</div>      
      <div class="col-2 border">${item.price.toFixed(2)}</div>
      <div class="col-2 border"><ion-icon name="add-circle-outline"></ion-icon> ${
        item.inCart
      } <ion-icon name="remove-circle-outline"></div>
      <div class="col-3 border">${(item.price * item.inCart).toFixed(2)}</div>
    </div>
      
      `;
    });

    secondRow.onclick = function (e) {
      if (e.target && e.target.classList.contains("remove")) {
        console.log("onclick remove - Yeah");
      }
    };

    secondRow.innerHTML += `
    <div class="row three-rs font-size-rs">
    <div class="col-7"></h4></div>
    <div class="col-2">Basket Total:</div>
    <div class="col-3">$${cartCost.toFixed(2)}</div>
    
    </div>
    
    `;
  }
}

onLoadCartNumbers();
displayCart();


// back to top function
//Get the button:
const mybutton = document.getElementById("scrollup");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
} 
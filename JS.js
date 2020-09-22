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

for (let i = 0; i < fCart.length; i++) {
  fCart[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}

// restores count number on cart if page is reloaded.

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector(".cart span").textContent = productNumbers;
  }
}

// Sets number of items in browser's  local Storage starting from 1 when button(s) // is pressed.

function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");

  productNumbers = parseInt(productNumbers);
  //console.log("display null???", productNumbers); //displays =NaN

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    // sets home page cart count
    document.querySelector(".cart span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);

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
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      console.log("cartItems is now undefined ***");
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

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost");

  if (cartCost != null) {
    cartCost = parseFloat(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
    console.log(localStorage.getItem("totalCost", product.price));
    console.log(typeof localStorage.getItem("totalCost", product.price));
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  let secondRow = document.querySelector(".row-products-rs");

  let cartCost = localStorage.getItem("totalCost");
  cartCost = parseFloat(cartCost);

  if (cartItems && secondRow) {
    Object.values(cartItems).map((item) => {
      secondRow.innerHTML += `
      <div class="row two-rs font-size-rs">
      <div class="col-2"><img src="Images/${item.tag}.jpg" height="40"></div>
      <div class="col-3">${item.name}</div>
      <div class="col-2">${item.price.toFixed(2)}</div>
      <div class="col-2">${item.inCart}</div>
      <div class="col-3">${(item.price * item.inCart).toFixed(2)}</div>
    </div>
      
      `;
    });
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

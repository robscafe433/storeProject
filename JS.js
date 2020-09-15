let fCart = document.querySelectorAll(".add-cart");

let products = [
  //Groceries list:
  {
    name: "Carrots",
    tag: "produce-carrots",
    price: 6.0,
    inCart: 0,
  },

  {
    name: "Lettuce",
    tag: "produce-lettuce",
    price: 4.0,
    inCart: 0,
  },

  {
    name: "Tomatoes",
    tag: "produce-tomatoes",
    price: 2.5,
    inCart: 0,
  },

  // Garden list:
  {
    name: "Shovel",
    tag: "garden-shovel",
    price: 4,
    inCart: 0,
  },

  {
    name: "Fertilizer",
    tag: "garden-fertilizer",
    price: 5,
    inCart: 0,
  },

  {
    name: "Rake",
    tag: "garden-rake",
    price: 6,
    inCart: 0,
  },

  // Household list

  {
    name: "Napkins",
    tag: "household-napkins",
    price: 2,
    inCart: 0,
  },

  {
    name: "Plates",
    tag: "household-plates",
    price: 3,
    inCart: 0,
  },

  {
    name: "Spoons",
    tag: "household-spoons",
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

// function onLoadCartNumbers() {
//   let productNumbers = localStorage.getItem("cartNumbers");

//   if (productNumbers) {
//     document.querySelector(".cart span").textContent = productNumbers;
//   }
// }

// Sets number of items in browser's  local Storage starting from 1 when button(s) // is pressed.

function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");

  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    // sets home page cart count
    //document.querySelector(".cart span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);

    //document.querySelector(".cart span").textContent = 1;
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
    console.log("cartItems is null ***");
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
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".products");
  let cartCost = localStorage.getItem("totalCost");

  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
      <br>
      <span>${item.name}</span>
      <span>${item.price}</span>
      <span>${item.inCart}</span>
      
      `;
    });
  }
}

//onLoadCartNumbers();
displayCart();

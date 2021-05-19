let totalCartItems = 0;

let cartBtnUpperRightHand = document.querySelector(".cartBtnUpperRightHand");

let ssproducts = sessionStorage.getItem("products");
ssproducts = JSON.parse(ssproducts);

ssproducts.map((items) => {
    totalCartItems += items.inCart;
    sessionStorage.setItem("totalCartItems", JSON.stringify(totalCartItems));
});

cartBtnUpperRightHand.innerHTML = `
  <ion-icon name="cart-outline"></ion-icon>
    ${totalCartItems}
    `;
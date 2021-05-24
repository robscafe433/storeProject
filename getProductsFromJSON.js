class GetJSONProductsClass {
  async getJsonData(pageName) {
    try {
      let cartPage = document.querySelector(".cart-Page");
      let result = await fetch("../items.json");
      let data = await result.json();
      let products = data.items;

      if(pageName === "all") {
        return products.reduce((total, category) => {
          return total.concat(category.products);
        }, []);
      }

      let selectedCategory = pageName;
      let results = products.filter((el) => {
        return el.category === selectedCategory;
      });

      return results[0].products;

      //What does below code do???
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

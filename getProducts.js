class Products {
    async getJsonData() {
      try {
       
        let result = await fetch("../items.json");
        let data = await result.json();
        let products = data.items;
  
        return products;
  
       
        
      } catch (error) {
        console.log(error);
      }
    }
    

    getPageData(pageName){
        let products= this.getJsonData()
        let selectedCategory = pageName;
        let results = products.filter((el) => {
          return el.category === selectedCategory;
        });
  
       
          return results[0].products;
        
  }
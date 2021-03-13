Object.values(results).map((items) => {
    console.log("Inside MAP ***", items, items.name);
    secondRowPA.innerHTML += ` 
    <div class="col-3 second-row-PA  ">
    <img src="${items.image}" height="40">
    </div>
    <div class="col-3 second-row-PA ">
    <h4>${items.name}</h4>



    
                                    </div>
                        <div class="col-3 align-self-center second-row-PA ">
                        <div class="input-group w-75 px-1 mb-1">
                                <div class="input-group-prepend">
                                    <button class="btn btn-outline-secondary px-2" type="button">
                                        -
                                    </button>
                                </div>
                                <input type="text" class="form-control" placeholder="Qty" value="${items.inCart}" aria-label="Quantity" aria-describedby="basic-addon1">
                                <div class="input-group-prepend">
                                    <button class="btn btn-outline-secondary px-2" type="button">
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-3 second-row-PA">
    <h4>X</h4>
                        </div>
                       
    
    `;
});

let carts = document.querySelectorAll('.menu__button');

let products = [
   { 
   name: 'Jollof Rice and Chicken',
   price: 1200,
   tag: 'jollof',
   InCart: 0
   },
   { 
   name: 'Assorted Macaroni',
   price: 1800,
   tag: 'hot',
   InCart: 0
   },
   { 
   name: 'Pasta and Curry Soup',
   price: 2000,
   tag: 'background3',
   InCart: 0
   }
];

for (let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', () => {
    cartNumbers(products[i]);
    totalCost(products[i])
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}


function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);
    
    if (productNumbers) { 
       localStorage.setItem('cartNumbers', productNumbers + 1);
       document.querySelector('.cart span').textContent = productNumbers + 1;
    }
    else {
       localStorage.setItem('cartNumbers', 1); 
       document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
  }

  function setItems(product) {
        let cartItems = localStorage.getItem('productsInCart');
        cartItems = JSON.parse(cartItems);
        if (cartItems != null){

            if(cartItems[product.tag] == undefined) {
                cartItems = {
                    ...cartItems,
                    [product.tag]: product
                }
            }
            cartItems[product.tag].InCart += 1;
        }
        else{
          product.InCart = 1;
         cartItems = {
            [product.tag]: product   
        }
        }
        
        localStorage.setItem("productsInCart", JSON.stringify(cartItems));
        }
        function totalCost(product) {
            let cartCost = localStorage.getItem('totalCost');
            
            console.log("my cartCost is", cartCost);
            console.log(typeof cartCost);

            if (cartCost != null){
                cartCost = parseInt(cartCost);
                localStorage.setItem('totalCost', cartCost + product.price);
            }
            else{
             localStorage.setItem("totalCost", product.price);  
            }
        }

        function displayCart() {
            let cartItems = localStorage.getItem("productsInCart");
            cartItems = JSON.parse(cartItems);
            let productContainer = document.querySelector(".products");
            let cartCost = localStorage.getItem('totalCost');

            console.log(cartItems);
            if( cartItems && productContainer ) {
               productContainer.innerHTML = '';
               Object.values(cartItems).map(item => { 
                productContainer.innerHTML += `
                   <div class="product">
                      <i class="fa fa-remove"></i>
                      <img src="./img/${item.tag}.jpg">
                      <span>${item.name}</span>
                   </div> 

                   <div class="price">#${item.price},00</div>

                   <div class="quantity">
                     <i class="fa fa-minus" aria-hidden="true"></i>
                     <span>${item.InCart}</span>
                     <i class="fa fa-plus" aria-hidden="true"></i>
                   </div>

                   <div class="total">
                   #${item.InCart * item.price},00
                   </div>
                   ` 
               });
               productContainer.innerHTML += `
                  <div class="basketTotalContainer">
                    <h4 class="basketTotalTitle">
                      Basket total
                    </h4> 
                    <h4 class="basketTotal">
                      #${cartCost},00
                    </h4>
                    </div> 
               `
            }
        }
        onLoadCartNumbers();
        displayCart();  
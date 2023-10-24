// // Function to add items to the cart
// function addToCart(name, price) {
//     // Retrieve the cart data from localStorage
//     const cart = JSON.parse(localStorage.getItem('cart')) || [];

//     // Add the new item to the cart
//     cart.push({ name, price });

//     // Store the updated cart data in localStorage
//     localStorage.setItem('cart', JSON.stringify(cart));
// }

// // Function to display items in the cart
// function displayCart() {
//     // Retrieve the cart data from localStorage
//     const cart = JSON.parse(localStorage.getItem('cart')) || [];

//     // Get the cart items container element
//     const cartItemsContainer = document.getElementById('cart-items');

//     // Get the cart total element
//     const cartTotal = document.getElementById('cart-total');

//     // Clear any previous content in the cart items container
//     cartItemsContainer.innerHTML = '';

//     let total = 0;

//     // Loop through the items in the cart and display them
//     cart.forEach((item, index) => {
//         const cartItem = document.createElement('div');
//         cartItem.classList.add('row', 'cart-item');
//         cartItem.innerHTML = `
//             <div class="col-md-6">
//                 <h4 class="cart-item-title">${item.name}</h4>
//                 <p class="cart-item-price">$${item.price}</p>
//             </div>
//             <div class="col-md-3">
//                 <input
//                     type="number"
//                     id="item-quantity-${index}"
//                     value="1"
//                     min="1"
//                     class="form-control"
//                     onchange="calculateTotal()"
//                 />
//             </div>
//             <div class="col-md-3">
//                 <button class="btn btn-danger" onclick="removeItem(${index})">
//                     Remove
//                 </button>
//             </div>
//         `;
//         cartItemsContainer.appendChild(cartItem);
//         total += item.price;
//     });

//     // Display the cart total
//     cartTotal.textContent = `Total: $${total.toFixed(2)}`;
// }

// // Function to remove an item from the cart
// function removeItem(index) {
//     // Retrieve the cart data from localStorage
//     const cart = JSON.parse(localStorage.getItem('cart')) || [];

//     // Remove the item at the specified index
//     if (index >= 0 && index < cart.length) {
//         cart.splice(index, 1);

//         // Store the updated cart data in localStorage
//         localStorage.setItem('cart', JSON.stringify(cart));

//         // Refresh the cart display
//         displayCart();
//     }
// }

// // Call the displayCart function when the cart page loads
// displayCart();



let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Cheese, Chutney & Cucumber',
        image: 'sandwiche.jpg',
        price: 80
    },
    {
        id: 2,
        name: 'Chicken Grilled',
        image: 'ChickenGrilledSandwiche.jpg',
        price: 140
    },
    {
        id: 3,
        name: 'Chicken Mayo',
        image: 'ChickenMayoSandwiche.jpg',
        price: 140
    },
    {
        id: 4,
        name: 'Chicken Tikka',
        image: 'ChickenTikkaSandwiche.jpg',
        price: 150
    },
    {
        id: 5,
        name: 'Smoked Chicken',
        image: 'SmokedChickenSandwiche.jpg',
        price: 150
    },
    {
        id: 6,
        name: 'Turkey',
        image: 'TurkeySandwiche.jpg',
        price: 150
    },    
    {
        id: 7,
        name: 'Chocolate Éclairs',
        image: 'dessert-image1.jpg',
        price: 80
    },
    {
        id: 8,
        name: 'Red Velvet/Chocolate Cup Cake',
        image: 'dessert-image2.jpg',
        price: 85
    },
  
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="menu/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">$${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="menu/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}
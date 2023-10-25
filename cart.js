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
        image: 'Sandwiche.jpg',
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
function initApp() {
    let count = 0; // Initialize a counter to keep track of the number of products displayed

    products.forEach((value, key) => {
        if (count === 0) {
            // Start a new row for the first product and every third product afterward
            let row = document.createElement('div');
            row.classList.add('row');
            list.appendChild(row);
        }

        let newDiv = document.createElement('div');
        newDiv.classList.add('col-md-4');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <div class="card mb-4">
                <img src="menu/${value.image}" class="card-img-top fixed-image" />
                <div class="card-body">
                    <h4 class="card-title">${value.name}</h4>
                    <p class="card-text">$${value.price.toLocaleString()}</p>
                    <button onclick="addToCart(${key})" class="button-5">Add To Cart</button>
                </div>
            </div>
        `;

        // Append the product card to the current row
        list.lastChild.appendChild(newDiv);

        count++;
        if (count === 3) {
            count = 0; // Reset the counter after displaying three products in a row
        }
    });
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
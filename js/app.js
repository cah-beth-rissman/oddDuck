'use strict';

console.log('JS file is alive');

/*
user select between two products
Flow:
- put 3 random products on the page
    - random number generator
    - function to display misc product
- User clicks on a product image
    - event listener needs to be on the image to trigger the event handler
    - event handler triggers
        -  ? is click count = 25 or 5 for testing ?
        - stop letting user click
        - display the clicks
        - ? if not 5 (25)?
            - track which product was clicked on
            - update click images count of how many times it has been clicked on
            - update three images' count of times shown
            - randomly pick three products, run the same code that pu them on the screen to begin with
HTML
    - have a left, right and center image container in the HTML
    - give image ids so we can select them (demo grabbed DOM elements)
    - tell users what to do by providing instructions

JS details
    - objects are needed with all the image properties
const Image = function (){
    name: 'product 1',
    clicks: 0,
    timesShown: 0,
    url: 'insert.jpg'
};

    - array to hold all image objects
function to randomly pick an image {
    - pick products as evenly as possible
    Math.floor Math.random() * array.length()
    three displayed images must be unique
}

click on an iage, targeted by id
add event listener('click', function(){
    keep track of the iamge that is clicked
    prevent all currently displayed images from being re-clicked {
    }
})

funtion to display all the clicks at the end () {
    generate a table or ul list
    populate the data - adds to the inner html of an existing element (table or list)
    divide object's times clicked by total shown
}
*/

// global variables
Product.allProductsArray = [];
let productContainer = document.querySelector('section');
let resultButton = document.querySelector('section + div');
let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');
console.log(productContainer, resultButton, image1, image2, image3);

let clicks = 0;
let maxClicks = 25;
console.log('click tracking' ,{clicks, maxClicks});

// constructor function
function Product(name, src) {
  this.name = name;
  this.src = src;
  this.views = 0;
  this.click = 0;
  Product.allProductsArray.push(this);
}
console.log('do we have Products? ',Product.allProductsArray);

// function helper for randomization
function getRandomNumber() {
  return Math.floor(Math.random() * Product.allProductsArray.length);
}

// function to render product displayed
function renderProducts() {
  let product1 = getRandomNumber();
  let product2 = getRandomNumber();
  let product3 = getRandomNumber();
  console.log(product1,product2,product3);

  while(product1 === product3){
    product3 = getRandomNumber();
  }

  while(product1 === product2 || product3 === product2){
    product2 = getRandomNumber();
  }
  console.log(product1,product2,product3);


  // capture data about iamges so we can track the data in our objects
  // update the src for the new image to be seen after each click
  image1.src = Product.allProductsArray[product1].src;
  image2.src = Product.allProductsArray[product2].src;
  image3.src = Product.allProductsArray[product3].src;

  // update alt attributes
  image1.alt = Product.allProductsArray[product1].name;
  image2.alt = Product.allProductsArray[product2].name;
  image3.alt = Product.allProductsArray[product3].name;

  //times shown on page
  Product.allProductsArray[product1].views++;
  Product.allProductsArray[product2].views++;
  Product.allProductsArray[product3].views++;

} // closes our renderProducts function

// // function to handle clicks
function handleProductClick(event) {
  console.log('click event happening' , event);
  if(event.target === productContainer){
    alert('please click on a product');

  }

  //how many times clicked on
  clicks++;
  let clickProduct = event.target.alt;
  console.log(clickProduct);
  for(let i = 0; i < Product.allProductsArray.length; i++){
    if(clickProduct === Product.allProductsArray[i].name){
      Product.allProductsArray[i].click++;
      break;
    }
  }

  // if have max attempts completed 5 for testing or 25
  if (clicks === maxClicks) {
    productContainer.removeEventListener('click', handleProductClick);
    //enable button to see results
    resultButton.addEventListener('click', renderResults);
    productContainer.className = 'no-voting';
  } else {
    renderProducts();

  }

}

//function for our render of results to a list
function renderResults(){
  let ul = document.querySelector('ul');
  for(let i = 0; i < Product.allProductsArray.length; i++){
    let li = document.createElement('li');
    li.textContent = `${Product.allProductsArray[i].name} had ${Product.allProductsArray[i].views} views and were clicked on ${Product.allProductsArray[i].click} times`;
    ul.appendChild(li);
  }
}

// product objects and call the constructor with the new operator

new Product('bag', '../images/bag.jpg');
new Product('banana', '../images/banana.jpg');
new Product('bathroom', '../images/bathroom.jpg');
new Product('boots', '../images/boots.jpg');
new Product('breakfast', '../images/breakfast.jpg');
new Product('bubblegum', '../images/bubblegum.jpg');
new Product('chair', '../images/chair.jpg');
new Product('cthulhu', '../images/cthulhu.jpg');
new Product('dog-duck', '../images/dog-duck.jpg');
new Product('dragon', '../images/dragon.jpg');
new Product('pen', '../images/pen.jpg');
new Product('pet-sweep', '../images/pet-sweep.jpg');
new Product('scissors', '../images/scissors.jpg');
new Product('shark', '../images/shark.jpg');
new Product('sweep', '../images/sweep.png');
new Product('tauntaun', '../images/tauntaun.jpg');
new Product('unicorn', '../images/unicorn.jpg');
new Product('water-can', '../images/water-can.jpg');
new Product('wine-glass', '../images/wine-glass.jpg');

//call all functions
renderProducts();

//add event listener to run handleClick()
productContainer.addEventListener('click', handleProductClick);


'use strict';

console.log('JS file is alive');

Product.allProductsArray = [];
let productContainer = document.querySelector('section');
let resultButton = document.querySelector('section + div');

//refactor lab 13
let imageElements = document.getElementsByTagName('img');
console.log('image Elements ',imageElements);
let image1 = 0;
let image2 = 1;
let image3 = 2;

// let image1 = document.querySelector('section img:first-child');
// let image2 = document.querySelector('section img:nth-child(2)');
// let image3 = document.querySelector('section img:nth-child(3)');
// console.log(productContainer, resultButton, image1, image2, image3);

let clicks = 0;
let maxClicks = 25;
// console.log('click tracking' ,{clicks, maxClicks});

function Product(name, src, views, click) {
  this.name = name;
  this.src = src;
  if(views){
    this.views = views;
  } else {
    this.views = 0;
  }
  if(click){
    this.click = click;
  } else {
    this.click = 0;
  }

  Product.allProductsArray.push(this);
}
// console.log('do we have Products? ',Product.allProductsArray);

let savedProductString = localStorage.getItem('savedProduct');
console.log('product strings',savedProductString);
//get item from local storage

// send those through our constructor function
if(savedProductString){
  let arraryOfNotProductObject = JSON.parse(savedProductString);
  console.log('objects that don\'t know they are products?', arraryOfNotProductObject);
  // once we have object we are going to run them through our constructor function so that they are Product objects

  for(let i = 0; i < arraryOfNotProductObject.length; i++){
    new Product(
      arraryOfNotProductObject[i].name,
      arraryOfNotProductObject[i].src,
      arraryOfNotProductObject[i].views,
      arraryOfNotProductObject[i].click
    );
  }
  console.log('products',Product.allProductsArray);
} else {
  //callign the constructor function
  new Product('bag', 'images/bag.jpg');
  new Product('banana', 'images/banana.jpg');
  new Product('bathroom', 'images/bathroom.jpg');
  new Product('boots', 'images/boots.jpg');
  new Product('breakfast', 'images/breakfast.jpg');
  new Product('bubblegum', 'images/bubblegum.jpg');
  new Product('chair', 'images/chair.jpg');
  new Product('cthulhu', 'images/cthulhu.jpg');
  new Product('dog-duck', 'images/dog-duck.jpg');
  new Product('dragon', 'images/dragon.jpg');
  new Product('pen', 'images/pen.jpg');
  new Product('pet-sweep', 'images/pet-sweep.jpg');
  new Product('scissors', 'images/scissors.jpg');
  new Product('shark', 'images/shark.jpg');
  new Product('sweep', 'images/sweep.png');
  new Product('tauntaun', 'images/tauntaun.jpg');
  new Product('unicorn', 'images/unicorn.jpg');
  new Product('water-can', 'images/water-can.jpg');
  new Product('wine-glass', 'images/wine-glass.jpg');
}

// function getRandomNumber() {
//   return Math.floor(Math.random() * Product.allProductsArray.length);
// }

function getProductArray(nameOfThePropertyIWant){
  let arrayResults = [];
  for(let i = 0; i < Product.allProductsArray.length; i++){
    arrayResults[i] = Product.allProductsArray[i][nameOfThePropertyIWant];
  }
  console.log('our new array', arrayResults);
  return arrayResults;
}



function renderProducts() {
  // let product1 = getRandomNumber();
  // let product2 = getRandomNumber();
  // let product3 = getRandomNumber();
// refactor math
  let product1 = Math.floor(Math.random() * Product.allProductsArray.length);
  let product2 = Math.floor(Math.random() * Product.allProductsArray.length);
  let product3 = Math.floor(Math.random() * Product.allProductsArray.length);
  console.log(product1,product2,product3);

  // while(product1 === product3){
  //   product3 = getRandomNumber();
  // }

  while(product1 === image1 || product1 === image2){
    product1 = Math.floor(Math.random() * Product.allProductsArray.length);
  }
  while(product2 === image2 || product1 === product2){
    product2 = Math.floor(Math.random() * Product.allProductsArray.length);
  }
  // setup a ref to the product array
  image1 = product1;
  image2 = product2;
  image3 = product3;

  // image1.src = Product.allProductsArray[product1].src;
  // image2.src = Product.allProductsArray[product2].src;
  // image3.src = Product.allProductsArray[product3].src;
  imageElements[0].src = Product.allProductsArray[product1].src;
  imageElements[1].src = Product.allProductsArray[product2].src;
  imageElements[2].src = Product.allProductsArray[product3].src;

  imageElements[0].src = Product.allProductsArray[product1].name;
  imageElements[1].src = Product.allProductsArray[product2].name;
  imageElements[2].src = Product.allProductsArray[product3].name;

  Product.allProductsArray[product1].views++;
  Product.allProductsArray[product2].views++;
  Product.allProductsArray[product3].views++;

}

function handleProductClick(event) {
  console.log('click event happening' , event);
  if(event.target === productContainer){
    alert('please click on a product');
  }

  clicks++;
  let clickProduct = event.target.alt;
  console.log(clickProduct);
  for(let i = 0; i < Product.allProductsArray.length; i++){
    if(clickProduct === Product.allProductsArray[i].name){
      Product.allProductsArray[i].click++;
      break;
    }
  }

  if (clicks === maxClicks) {
    productContainer.removeEventListener('click', handleProductClick);
    resultButton.addEventListener('click', renderResults);
    productContainer.className = 'no-voting';

    console.log('Do we have object number?',Product.allProductsArray);
    localStorage.setItem('savedProduct', JSON.stringify(Product.allProductsArray));


  } else {
    renderProducts();

  }

}

function renderResults(){
  let ul = document.querySelector('ul');
  for(let i = 0; i < Product.allProductsArray.length; i++){
    let li = document.createElement('li');
    li.textContent = `${Product.allProductsArray[i].name} had ${Product.allProductsArray[i].views} views and were clicked on ${Product.allProductsArray[i].click} times`;
    ul.appendChild(li);

    let percentageListItem = document.createElement('li');
    let math;
    if(Product.allProductsArray[i].click === 0){
      math = `Zero clicks and shown ${Product.allProductsArray[i].view} times.`;
    } else {
      math = Math.round(((Product.allProductsArray[i].click / Product.allProductsArray[i]['views']).toFixed(2) * 100)) + '%';
    }
    percentageListItem.textContent = `${Product.allProductsArray[i].name} percentage of times clicked on vs times shown is ` + math;
    ul.appendChild(percentageListItem);
  }
  showResultChart();
}




renderProducts();

productContainer.addEventListener('click', handleProductClick);

function showResultChart(){
  // console.log(Product.allProductsArray);
  // console.log('chart is working');
  // let labels = [];
  // let voteCounts = [];
  // let showCounts = [];
  // let votePercentage = [];

  // for (let i = 0; i < Product.allProductsArray.length; i++) {
  // // update 4 arrays
  //   console.log('Test from array' ,Product.allProductsArray[i].name);
  //   labels[i] = Product.allProductsArray[i].name;
  //   voteCounts[i] = Product.allProductsArray[i].click;
  //   showCounts[i] = Product.allProductsArray[i].views;
  //   votePercentage[i] = Math.floor(100 * (voteCounts[i] / showCounts[i]));

  // }



  // console.log('labels' ,labels);
  // console.log('voteCounts' ,voteCounts);
  // console.log('showCounts' ,showCounts);
  // console.log('votePercentage' ,votePercentage);

  const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: getProductArray('name'),
      datasets: [{
        label: 'Vote Count',
        data: getProductArray('click'),
        backgroundColor: [ 'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1

      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }

  });
}


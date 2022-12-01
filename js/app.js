'use strict';

console.log('JS file is alive');

Product.allProductsArray = [];
let productContainer = document.querySelector('section');
let resultButton = document.querySelector('section + div');
let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');
// console.log(productContainer, resultButton, image1, image2, image3);

let clicks = 0;
let maxClicks = 25;
// console.log('click tracking' ,{clicks, maxClicks});

function Product(name, src) {
  this.name = name;
  this.src = src;
  this.views = 0;
  this.click = 0;
  Product.allProductsArray.push(this);
}
// console.log('do we have Products? ',Product.allProductsArray);

function getRandomNumber() {
  return Math.floor(Math.random() * Product.allProductsArray.length);
}

function renderProducts() {
  let product1 = getRandomNumber();
  let product2 = getRandomNumber();
  let product3 = getRandomNumber();
  // console.log(product1,product2,product3);

  while(product1 === product3){
    product3 = getRandomNumber();
  }

  while(product1 === product2 || product3 === product2){
    product2 = getRandomNumber();
  }
  // console.log(product1,product2,product3);

  image1.src = Product.allProductsArray[product1].src;
  image2.src = Product.allProductsArray[product2].src;
  image3.src = Product.allProductsArray[product3].src;

  image1.alt = Product.allProductsArray[product1].name;
  image2.alt = Product.allProductsArray[product2].name;
  image3.alt = Product.allProductsArray[product3].name;

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
  }
  showResultChart();
}

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


renderProducts();

productContainer.addEventListener('click', handleProductClick);

function showResultChart(){
  console.log(Product.allProductsArray);
  console.log('chart is working');
  let labels = [];
  let voteCounts = [];
  let showCounts = [];
  let votePercentage = [];

  for (let i = 0; i < Product.allProductsArray.length; i++) {
  // update 4 arrays
    console.log('Test from array' ,Product.allProductsArray[i].name);
    labels[i] = Product.allProductsArray[i].name;
    voteCounts[i] = Product.allProductsArray[i].click;
    showCounts[i] = Product.allProductsArray[i].views;
    votePercentage[i] = Math.floor(100 * (voteCounts[i] / showCounts[i]));

  }



  console.log('labels' ,labels);
  console.log('voteCounts' ,voteCounts);
  console.log('showCounts' ,showCounts);
  console.log('votePercentage' ,votePercentage);

  const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Vote Count',
        data: voteCounts,
        backgroundColor: 'rgb(255,0,0)',
      },
      {
        label: 'Times Shown',
        data: showCounts,
        backgroundColor: 'rgb(0,0,255)',
      },
      {
        label: 'Vote Percentage',
        data: votePercentage,
        backgroundColor: 'gray'
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


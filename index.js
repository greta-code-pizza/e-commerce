// Simule notre API
import apiProducts from './data';

// On import notre style
import './style.scss';

// On importe nos objets
import Cart from "./src/Cart";
import Product from "./src/Product";
import User from "./src/User";


// On simule le fait d'être connecté en tant qu'utilisateur
let john = new User("John", "Doe");
let cart = new Cart(john);

let root = document.getElementById("root");
let btns = document.getElementById("btns");
let userBar = document.getElementById("user");

let productList = Product.all(apiProducts);

let btnAll = document.createElement('button');
let btnCheese = document.createElement('button');
let btnPasta = document.createElement('button');

btnAll.innerText = "Tous les aliments";
btnCheese.innerText = "Fromage";
btnPasta.innerText = "Pâtes";

btnAll.onclick = () => {
  productList = Product.all(apiProducts);
  showList(productList)
}

btnCheese.onclick = () => {
  productList = Product.filter(Product.all(apiProducts), "fromage");
  showList(productList)
}

btnPasta.onclick = () => {
  productList = Product.filter(Product.all(apiProducts), "pâtes");
  showList(productList)
}

btns.appendChild(btnAll);
btns.appendChild(btnCheese);
btns.appendChild(btnPasta);


function topUser(user) {
  if(user.prime) {
    userBar.innerHTML = `${user.fullName()} <button class="prime">Premium</button>`;
  } else {
    userBar.innerHTML = `${user.fullName()} <button id="primify">Devenir premium</button>`;
  }
}

topUser(john);

function displayCart(nb, val) {
  let cart = document.getElementById("cart");
  cart.innerText = `${nb} article${nb > 1 ? 's' : ''} d'une valeur de ${val} €`;
}

document.getElementById('primify').addEventListener('click', () => {
  john.prime = true;
  topUser(john);
  displayCart(cart.count(), cart.total())
});

function showList(productList) {
  root.innerHTML = "";
  // Affichage dans le root
  productList.forEach(product => {
    let card = document.createElement('div');
    let paragraph = document.createElement('p');
    let title = document.createElement('h2');
    let img = document.createElement('img');
    let btn = document.createElement('button');

    card.classList.add('card');

    title.innerText = product.label;
    
    img.src = product.image;

    paragraph.classList.add('content');
    paragraph.innerText = product.shortDescription();

    btn.innerText = 'Ajouter au panier'


    btn.onclick = () => {
      cart.add(product);
      displayCart(cart.count(), cart.total())
    }

    card.appendChild(title);
    card.appendChild(img);
    card.appendChild(paragraph);
    card.appendChild(btn);
    root.appendChild(card);
  });
}

showList(productList)




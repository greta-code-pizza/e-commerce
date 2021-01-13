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
let userBar = document.getElementById("user");

function topUser(user) {
  userBar.innerHTML = `${user.fullName()} ${user.prime ? '<button class="prime">Premium</button>' : '<button id="primify">Devenir premium</button>'}`;
}

topUser(john);

document.getElementById('primify').addEventListener('click', () => {
  john.prime = true;
  topUser(john);
  displayCart(cart.count(), cart.total())
});

function displayCart(nb, val) {
  let cart = document.getElementById("cart");
  cart.innerText = `${nb} article${nb > 1 ? 's' : ''} d'une valeur de ${val} €`;
}

apiProducts.forEach(apiP => {
  let product = new Product(apiP.label, apiP.barCode, apiP.price, apiP.description, apiP.image);

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
    console.log(cart.count())
    displayCart(cart.count(), cart.total())
  }

  card.appendChild(title);
  card.appendChild(img);
  card.appendChild(paragraph);
  card.appendChild(btn);
  root.appendChild(card);
});





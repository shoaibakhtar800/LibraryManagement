const storedCart = localStorage.getItem('cart');
if (storedCart) {
  cart = JSON.parse(storedCart);
}

cart.forEach((value) => {
    const cardContainer = document.getElementById('container');

    const cardDisplay = document.createElement('div');
    cardDisplay.className = 'card';

    const titleDisplay = document.createElement('h1');
    titleDisplay.className = 'title';
    titleDisplay.textContent = `Title: ${value.title}`;

    const quantityDisplay = document.createElement('h1');
    quantityDisplay.className = 'subtitle';
    quantityDisplay.textContent = `Quantity: ${value.quantity}`;

    cardDisplay.appendChild(titleDisplay);
    cardDisplay.appendChild(quantityDisplay);

    cardContainer.appendChild(cardDisplay);
})

console.log(cart);
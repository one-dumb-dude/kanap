document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    let productImage;
    console.log(id);
    fetch(`http://localhost:3000/api/products/${id}`)
        .then(response => response.json())
        .then(data => {
            const imgContainer = document.querySelector('.item__img');
            imgContainer.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}" />`;
            productImage = data.imageUrl;

            const priceContainer = document.querySelector('#price');
            priceContainer.innerText = data.price;

            const titleContainer = document.querySelector('#title');
            titleContainer.innerText = data.name;

            const descriptionContainer = document.querySelector('#description');
            descriptionContainer.innerText = data.description;

            const colorSelector = document.querySelector('#colors');
            data.colors.forEach((color) => {
                const optionElement = document.createElement('option');
                optionElement.innerText = color;
                optionElement.value = color;
                colorSelector.appendChild(optionElement);
            });

        })
        .catch((err) => {
            console.error(err);
        });

    const addToCartBtn = document.querySelector('#addToCart');
    addToCartBtn.addEventListener('click', () => {

        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        const color = document.querySelector('#colors').value;
        const quantity = document.querySelector('#quantity').value;

        const cartItem = cart.find(item => item.id === id && item.color === color);

        if (cartItem) {
            cartItem.quantity = Number(cartItem.quantity) + Number(quantity);
        } else {
            cart.push({
                id,
                color,
                quantity
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        window.location.href = 'cart.html';
    });

});



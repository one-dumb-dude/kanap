document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    let productImage;

    // Fetch product details from the API using product ID.
    // Then, use the fetched data to populate product image, price, title, description, and color options.
    // Log any errors that occur during the fetch operation.
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

    // Add an event listener to the addToCart button.
    // When clicked, it fetches the selected color and quantity.
    // If valid values are selected, it updates or adds the product to the local storage cart and redirects to the cart page.
    addToCartBtn.addEventListener('click', () => {
        const color = document.querySelector('#colors').value;
        const quantity = document.querySelector('#quantity').value;

        if (color !== '' && quantity >= 1) {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];

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
        }
    });

});



document.addEventListener('DOMContentLoaded', () => {

    const cartStorage = localStorage.getItem('cart');

    if (cartStorage !== null) {
        const cartItemsElement = document.querySelector('#cart__items');
        const cartItems = JSON.parse(cartStorage);

        cartItems.forEach(cartItem => {
            fetch(`http://localhost:3000/api/products/${cartItem.id}`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                })
                .then(data => {
                    console.log(data);
                    const cartItemString = `
                         <article class="cart__item" data-id="${cartItem.id}" data-color="${cartItem.color}">
                            <div class="cart__item__img">
                              <img src="${data.imageUrl}" alt="${data.altTxt}">
                            </div>
                            <div class="cart__item__content">
                              <div class="cart__item__content__description">
                                <h2>${data.name}</h2>
                                <p>${cartItem.color}</p>
                                <p>€${Number(data.price) * Number(cartItem.quantity)}</p>
                              </div>
                              <div class="cart__item__content__settings">
                                <div class="cart__item__content__settings__quantity">
                                  <p>Quantity : ${cartItem.quantity}</p>
                                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartItem.quantity}">
                                </div>
                                <div class="cart__item__content__settings__delete">
                                  <p class="deleteItem">Delete</p>
                                </div>
                              </div>
                            </div>
                          </article>
                    `;
                    cartItemsElement.insertAdjacentHTML('beforebegin', cartItemString);
                })
                .catch(err => {
                    console.error(err);
                });

        });

    } else {
        console.error('Cart is empty');
    }

});

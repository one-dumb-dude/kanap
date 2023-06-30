document.addEventListener('DOMContentLoaded', () => {

    const cartStorage = localStorage.getItem('cart');

    if (cartStorage !== null) {
        let cartItemsElement = document.querySelector('#cart__items');

        cartInfo(cartStorage);

        // Event delegation:
        // it's a technique in JavaScript where you delegate the event handling of child elements to a parent element.
        // It takes advantage of the "bubbling" behavior of events, where an event on a child element is propagated up (bubbled) to its ancestors.
        // In this code, we're adding the event listener to 'cartItemsElement' which is the parent container for all cart items.
        // When an 'input' event (i.e., a change in value) occurs on an input field inside any cart item, the event is bubbled up to 'cartItemsElement'.
        // Then, in the event handler, we're checking if the event originated from an input field with the name 'itemQuantity'.
        // This way, we only need to add one event listener on the parent, instead of adding individual listeners to each input field in each cart item.
        // This is especially useful when the child elements (in this case, cart items) are dynamically added to the DOM, as it ensures the event handling works for future elements as well.
        cartItemsElement.addEventListener('input', (event) => {
            // Check if the event was triggered by an itemQuantity input
            if (event.target.classList.contains('itemQuantity')) {
                console.log(event.target.value);
                const articleElement = event.target.closest('article');
                const itemId = articleElement.dataset.id;
                const localStorageData = JSON.parse(localStorage.getItem('cart'));
                const editLocalStorage = localStorageData.map(lsItem => lsItem.id === itemId ? {...lsItem, quantity: event.target.value} : lsItem);

                if (editLocalStorage && editLocalStorage.length > 0) {
                    localStorage.setItem('cart', JSON.stringify(editLocalStorage));
                    const getLocalStorage = JSON.parse(localStorage.getItem('cart'));
                    const foundLsItem = getLocalStorage.find(lsItem => lsItem.id === itemId);
                    if (foundLsItem) {
                        const targetAncestorElement = event.target.closest('.cart__item__content');
                        targetAncestorElement.querySelector('.cart__item__content__settings__quantity > p').innerText = `Quantity : ${foundLsItem.quantity}`;
                    }
                }
            }

        });

        // Another Event Delegation
        cartItemsElement.addEventListener('click', (event) => {
            if (event.target.classList.contains('deleteItem')) {
                const idToRemove = event.target.closest('.cart__item').getAttribute('data-id');
                const getLocalStorage = JSON.parse(localStorage.getItem('cart'));
                const updatedCartList = getLocalStorage.filter(lsItem => lsItem.id !== idToRemove);
                localStorage.setItem('cart', JSON.stringify(updatedCartList));
                document.querySelector('#cart__items').innerHTML = '';
                const updatedLocalStorage = localStorage.getItem('cart');
                cartInfo(updatedLocalStorage);
            }
        });


        function cartInfo(passedInCartStorage) {
            const cartItems = JSON.parse(passedInCartStorage);

            cartItems.forEach((cartItem, index) => {
                fetch(`http://localhost:3000/api/products/${cartItem.id}`)
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error('Error fetching data');
                        }
                    })
                    .then(data => {
                        const cartItemString = `
                         <article class="cart__item" data-id="${cartItem.id}" data-color="${cartItem.color}">
                            <div class="cart__item__img">
                              <img src="${data.imageUrl}" alt="${data.altTxt}">
                            </div>
                            <div class="cart__item__content">
                              <div class="cart__item__content__description">
                                <h2>${data.name}</h2>
                                <p>${cartItem.color}</p>
                                <p>€${Number(data.price)}</p>
                              </div>
                              <div class="cart__item__content__settings">
                                <div class="cart__item__content__settings__quantity">
                                  <p>Quantity : ${cartItem.quantity}</p>
                                  <input type="number" class="itemQuantity" name="itemQuantity_${index}" min="1" max="100" value="${cartItem.quantity}">
                                </div>
                                <div class="cart__item__content__settings__delete">
                                  <p class="deleteItem">Delete</p>
                                </div>
                              </div>
                            </div>
                          </article>
                    `;

                        cartItemsElement.insertAdjacentHTML('beforeend', cartItemString);

                    })
                    .catch(err => {
                        console.error(err);
                    });

            });
        }


    } else {
        console.error('Cart is empty');
    }

});

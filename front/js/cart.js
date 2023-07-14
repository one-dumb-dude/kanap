document.addEventListener('DOMContentLoaded', () => {

    const cartStorage = localStorage.getItem('cart');

    let prices = [];

    if (cartStorage !== null) {
        const inputOrderSubmitBtn = document.querySelector('#order');
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
                const articleElement = event.target.closest('article');
                const itemId = articleElement.dataset.id;
                const localStorageData = JSON.parse(localStorage.getItem('cart'));
                const editLocalStorage = localStorageData.map(lsItem => lsItem.id === itemId ? {...lsItem, quantity: event.target.value} : lsItem);

                if (editLocalStorage && editLocalStorage.length > 0) {
                    localStorage.setItem('cart', JSON.stringify(editLocalStorage));
                    const getLocalStorage = JSON.parse(localStorage.getItem('cart'));
                    const foundLsItem = getLocalStorage.find(lsItem => lsItem.id === itemId);
                    if (foundLsItem) {
                        const price = prices.find(price => price.id === itemId);
                        const targetAncestorElement = event.target.closest('.cart__item__content');
                        targetAncestorElement.querySelector('.cart__item__content__description > p:nth-of-type(2)').innerText = `€${Number(price.price) * Number(foundLsItem.quantity)}`;
                        targetAncestorElement.querySelector('.cart__item__content__settings__quantity > p').innerText = `Quantity : ${foundLsItem.quantity}`;

                        // const itemQuantityElements = document.querySelector('#cart__items').querySelectorAll('.itemQuantity');
                        // const itemQuantities = Array.prototype.map.call(itemQuantityElements, itemQuantityElement => itemQuantityElement.value);
                        // const totalQuantity = itemQuantities.reduce((sum, item) => Number(sum) + Number(item), 0);
                        // const totalQuantityElement = document.querySelector('#totalQuantity');
                        // totalQuantityElement.innerText = totalQuantity;
                        getTotalArticles();
                    }
                }
            }
            ``
        });


        // Another Event Delegation
        // Adds a click event listener to the cartItemsElement.
        // When an item with the 'deleteItem' class is clicked, it identifies and removes
        // the corresponding item from local storage, and refreshes the displayed cart.
        cartItemsElement.addEventListener('click', (event) => {
            if (event.target.classList.contains('deleteItem')) {
                const idToRemove = event.target.closest('.cart__item').getAttribute('data-id');
                const colorOfId = event.target.closest('.cart__item').querySelector('.cart__item__content__description > p:nth-of-type(1)').innerText;
                const getLocalStorage = JSON.parse(localStorage.getItem('cart'));
                const updatedCartList = getLocalStorage.filter(lsItem => !(lsItem.id === idToRemove && lsItem.color === colorOfId));
                localStorage.setItem('cart', JSON.stringify(updatedCartList));
                document.querySelector('#cart__items').innerHTML = '';
                const updatedLocalStorage = localStorage.getItem('cart');
                cartInfo(updatedLocalStorage);
            }
        });

        const namesRegex = new RegExp(/^[A-Za-z]+[\-]* *$/);
        const cityRegex = new RegExp(/^(?=.*[A-Za-z])[A-Za-z\- ]*$/);
        const emailRegex = new RegExp(/^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+$/);

        const firstNameInputElement = document.querySelector("#firstName");
        firstNameInputElement.addEventListener('blur', (event) =>
            validateInput(event.target, namesRegex)
        );

        const lastNameInputElement = document.querySelector("#lastName");
        lastNameInputElement.addEventListener('blur', (event) =>
            validateInput(event.target, namesRegex)
        );

        const addressInputElement = document.querySelector('#address');
        addressInputElement.addEventListener('blur', (event) =>
            validateInput(event.target)
        );

        const cityInputElement = document.querySelector('#city');
        cityInputElement.addEventListener('blur', (event) =>
            validateInput(event.target, cityRegex)
        );

        // /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/
        const emailInputElement = document.querySelector('#email');
        emailInputElement.addEventListener('blur', (event) =>
            validateInput(event.target, emailRegex)
        );


        // validateInput checks if an input matches a regex pattern and handles error display.
        // It takes an HTML input element and a regex pattern. It tests the input value against
        // the regex, updates error message and applies/removes error styling as appropriate.
        function validateInput(target, regex) {
            const firstNameErrorMsgElement = document.querySelector('#firstNameErrorMsg');
            const lastNameErrorMsgElement = document.querySelector('#lastNameErrorMsg');
            const addressErrorMsgElement = document.querySelector('#addressErrorMsg');
            const cityErrorMsgElement = document.querySelector('#cityErrorMsg');
            const emailErrorMsg = document.querySelector('#emailErrorMsg');

            if (!target.value.match(regex) || target.value.trim() === '') {

                target.classList.add('input-error');

                switch (target.id) {
                    case 'firstName':
                        firstNameErrorMsgElement.innerText = 'Invalid input. first name must contain at least one alphabetical character. Spaces and hyphens are allowed but not required';
                        break;
                    case 'lastName':
                        lastNameErrorMsgElement.innerText = 'Invalid input. last name must contain at least one alphabetical character. Spaces and hyphens are allowed but not required';
                        break;
                    case 'address':
                        addressErrorMsgElement.innerText = 'Invalid input. Address must not be empty';
                        break;
                    case 'city':
                        cityErrorMsgElement.innerText = 'Invalid input. City must contain at least one alphabetical character. Spaces and hyphens are allowed but not required';
                        break;
                    case 'email':
                        emailErrorMsg.innerText = 'Invalid input. Must be in "email" format.';
                        break;
                    default:
                        break;
                }

            } else {

                target.classList.remove('input-error');

                switch (target.id) {
                    case 'firstName':
                        firstNameErrorMsgElement.innerText = '';
                        break;
                    case 'lastName':
                        lastNameErrorMsgElement.innerText = '';
                        break;
                    case 'address':
                        addressErrorMsgElement.innerText = '';
                        break;
                    case 'city':
                        cityErrorMsgElement.innerText = '';
                        break;
                    case 'email':
                        emailErrorMsg.innerText = '';
                        break;
                    default:
                        break;
                }
            }
        }

        //  cartInfo populates the shopping cart with product details fetched from the server.
        //  It accepts a stringified cart storage JSON, parses it, and iterates through each item.
        //  For each item, it makes a fetch request, builds an HTML string with product details,
        //  appends the HTML to the cart, and handles potential fetch errors.

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
                        prices.push({id: cartItem.id, price: Number(data.price)});
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
                    .then(() => {
                        getTotalArticles()
                    })
                    .catch(err => {
                        console.error(err);
                    });

            });
        }


        // This is the click event for the "order" button.
        // This click event contains logic for checking the input fields and throwing error messages if inputs are invalid
        // if the input validate, then the order is processed and sent to the confirmation page.
        inputOrderSubmitBtn.addEventListener('click', (event) => {
            event.preventDefault();
            if (
                firstNameInputElement.value.match(namesRegex) &&
                lastNameInputElement.value.match(namesRegex) &&
                addressInputElement.value.trim() !== '' &&
                cityInputElement.value.match(cityRegex) &&
                emailInputElement.value.match(emailRegex)
            ) {
                const cartItems = JSON.parse(localStorage.getItem('cart'));
                const data = {
                    contact: {
                        firstName: firstNameInputElement.value,
                        lastName: lastNameInputElement.value,
                        address: addressInputElement.value,
                        city: cityInputElement.value,
                        email: emailInputElement.value
                    },
                    products: cartItems.map(cartItem => cartItem.id)
                };
                fetch('http://localhost:3000/api/products/order', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        'Origin': 'http://localhost:63342'
                    },
                    body: JSON.stringify(data)
                })
                    .then(response => response.json())
                    .then(result => {
                        window.location.href = `confirmation.html?orderId=${encodeURIComponent(JSON.stringify(result.orderId))}`;
                    })
                    .catch(error => console.error(error))
                // window.location.href = 'confirmation.html'

            } else {
                validateInput(firstNameInputElement, namesRegex);
                validateInput(lastNameInputElement, namesRegex);
                validateInput(addressInputElement);
                validateInput(cityInputElement, cityRegex);
                validateInput(emailInputElement, emailRegex);
                console.error('Please check your input fields');
            }
        });

        // This function contains logic for obtaining the total quantity of items in the cart and displaying that information.
        // This function also calculates the item prices with its associated qty and presents the total to the front end.
        function getTotalArticles() {
            let totalPrice = 0;
            const cartItemsElement = document.querySelector('#cart__items')
            const itemQuantityElements = cartItemsElement.querySelectorAll('.itemQuantity');
            const articleElements = cartItemsElement.querySelectorAll('article');
            articleElements.forEach(articleElement => {
                const price = prices.find(price => price.id === articleElement.dataset.id);
                const quantity = articleElement.querySelector('.itemQuantity').value;
                totalPrice += Number(price.price) * Number(quantity);
            });

            const itemQuantities = Array.prototype.map.call(itemQuantityElements, itemQuantityElement => itemQuantityElement.value);
            const totalQuantity = itemQuantities.reduce((sum, item) => Number(sum) + Number(item), 0);
            const totalQuantityElement = document.querySelector('#totalQuantity');
            const totalPriceElement = document.querySelector('#totalPrice');
            totalPriceElement.innerText = totalPrice;
            totalQuantityElement.innerText = totalQuantity;
        }

    } else {
        console.error('Cart is empty');
    }

});

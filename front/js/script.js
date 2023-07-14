// On page load, it fetches the list of products from the API.
// For each product, it creates an HTML card and appends it to the 'items' section.
// It handles both network errors and API errors.

document.addEventListener('DOMContentLoaded', () => {
    let data;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/api/products');

    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 400) {
            data = JSON.parse(xhr.responseText);

            const cardHtml = data.map(item => `
              <a href="./product.html?id=${item?._id}">
                <article>
                  <img src="${item.imageUrl}" alt="${item.altTxt}">
                  <h3 class="productName">${item.name}</h3>
                  <p class="productDescription">${item.description}</p>
                </article>
              </a>
            `).join('');

            const sectionElement = document.querySelector('#items');
            sectionElement.innerHTML += cardHtml;

        } else {
            console.error('Error:', xhr.statusText);
        }
    }

    xhr.onerror = () => {
        console.error('Request Failed');
    }

    xhr.send();

});

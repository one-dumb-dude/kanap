document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    console.log(id);
    fetch(`http://localhost:3000/api/products/${id}`)
        .then(response => response.json())
        .then(data => {
            const imgContainer = document.querySelector('.item__img');
            imgContainer.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}" />`;

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
            })

        })
        .catch((err) => {
            console.error(err);
        });
});

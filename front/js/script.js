document.addEventListener('DOMContentLoaded', () => {
    let data;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/api/products');

    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 400) {
            data = JSON.parse(xhr.responseText);
            console.log(data);
        } else {
            console.error('Error:', xhr.statusText);
        }
    }

    xhr.onerror = () => {
        console.error('Request Failed');
    }

    xhr.send();

});

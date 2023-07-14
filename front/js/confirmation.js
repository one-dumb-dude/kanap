// On page load, it fetches 'orderId' from the URL query parameters and displays it in the element with id 'orderId'.
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    document.querySelector('#orderId').innerText = params.get('orderId');
});

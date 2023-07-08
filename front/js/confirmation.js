document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    document.querySelector('#orderId').innerText = params.get('orderId');
});

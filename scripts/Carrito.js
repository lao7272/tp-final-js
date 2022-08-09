
const buttonCart =  document.getElementById('buttonCart');



buttonCart.addEventListener('click', () => {
Swal.fire({
    title: '<strong><h3>Carrito de compras </h3></strong>',
    html:
        `<b><p></p></b>`,
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    
    });
});
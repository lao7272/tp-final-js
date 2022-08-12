
const buttonCart =  document.getElementById('buttonCart');
const cartArr = JSON.parse(localStorage.getItem('cartStorage')) ?? [];
console.log(cartArr);

// arrPok.sort((a, b) => {
//     if(a.id > b.id){
//         return 1
//     }
//     if(a.id < b.id){
//         return -1
//     }
//     return 0
// });
divPokemons.addEventListener('click', (e)=>{
    if(e.target && e.target.tagName === "BUTTON") {        
        arrPok.forEach((pok, i) => {
            if (e.target.id === `buyPok${i}`) {
                Swal.fire({
                    title: '<strong><h3>Carrito de compras </h3></strong>',
                    html:
                        `<img src="${pok.img}">`,
                    showCancelButton: true,
                    cancelButtonText: 'Cancelar',
                    confirmButtonText: 'Comprar',
                    focusConfirm: false,
                    width: '70%'                    
                    });
            }
        });
    }   
    if (e.target && e.target.tagName === "I") {
        arrPok.forEach((pok, i) => {
            if (e.target.id === `addCart${i}`) {
                cartArr.push(pok);
                localStorage.setItem('cartStorage', JSON.stringify(cartArr));
            }
        });
    }
});



buttonCart.addEventListener('click', () => {
Swal.fire({
    title: '<strong><h3>Carrito de compras </h3></strong>',
    html:
        `
        <div class="containerCart" id="divItemsCart"></div>
        <div class="totalCart"</div>
        `,
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    grow: 'column', 
    position: 'bottom-end',
    customClass:{
        container: 'cartPopup',
        popup: 'cartPopup',
        // confirmButton: '',
        // cancelButton: ''
    }
    
    });

    const divItemsCart = document.getElementById('divItemsCart');

    cartArr.forEach((pok, i) => {
        divItemsCart.innerHTML += `
        <div class="containerCartItem" id="pokCart${i}">
            <div  class="cartImg">
                <img src="${pok.img}" alt="Imagen de ${pok.name}">
            </div>
            <div class="cartInfo">
                <h3>${pok.name}</h3>
                <h4>Precio:</h4>
                <strong><p>$</p></strong>
            </div>
            <div class="cartDelete">
                <i class="fa-solid fa-trash-can fa-xl" id="deletePok${i}"></i>
            </div>
        </div>
        `
        
        divItemsCart.addEventListener('click', (e) => {
            if (e.target && e.target.tagName === "I") {
                
                if (e.target.id === `deletePok${i}`) {
                    
                    cartArr.splice(i, 1);
                    document.getElementById(`pokCart${i}`).remove();
                    localStorage.setItem('cartStorage', JSON.stringify(cartArr));
                    console.log(cartArr);
                    console.log(JSON.parse(localStorage.getItem('cartStorage')));
                }
                
            }
        });
    });
});


// .then((result) => {
//     if (result.isConfirmed) {
//       Swal.fire(
//         'Deleted!',
//         'Your file has been deleted.',
//         'success'
//       )
//     }
//   })

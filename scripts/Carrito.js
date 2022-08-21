
const buttonCart =  document.getElementById('buttonCart');
let cartArr = JSON.parse(localStorage.getItem('cartStorage')) ?? [];

const addPokToCart = (pok) => {
    const pokCart = cartArr.find(poke => poke.id == pok.id);

    if (pokCart){
        pokCart.quant++;
    } else {
        pok.quant = 1;
        cartArr.push(pok);
    }

}
const calcTotalPrice = (arr) => {
    let acum = arr.reduce((acum, item) => {
        return acum += (item.price * item.quant)
    }, 0);
    return acum
}

divPokemons.addEventListener('click', (e)=>{
    if(e.target && e.target.tagName === "BUTTON") {        
        arrPok.forEach((pok, i) => {
            if (e.target.id === `buyPok${pok.id}`) {
                Swal.fire({
                    title: '<strong><h3>Tu compra </h3></strong>',
                    html:
                        `
                        <div class="buyPokContainer">
                            <h3>${pok.name}</h3>
                            <img src="${pok.img}" alt="${pok.name}">
                            <p>Total: $${pok.price}</p>
                        </div>
                        `,
                    showCancelButton: true,
                    cancelButtonText: 'Cancelar',
                    confirmButtonText: 'Comprar',
                    focusConfirm: false,
                    width: '30%',
                    background: "linear-gradient(to top right, #ff8703,#ff4318,#f80404)", 
                    color: "#000",
                    buttonsStyling: false,
                    customClass:{
                        confirmButton: 'btn',
                        cancelButton: 'btn',
                        }                    
                    })
                    .then((result) => {
                        if (result.isConfirmed) {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Tu compra ha sido realizada exitosamente',
                                    showConfirmButton: false,
                                    timer: 1500,
                                    customClass:{
                                        popup: 'successPopup'
                                    } 
                                });                            
                        } 
                        
                    });
            }
        });
    }   
    if (e.target && e.target.tagName === "I") {
        arrPok.forEach((pok, i) => {
            if (e.target.id === `addCart${pok.id}`) {
                addPokToCart(pok)
                localStorage.setItem('cartStorage', JSON.stringify(cartArr));
                Toastify({
                    text: `Producto agregado al carrito`,
                    duration: 1000,
                    className: "info",
                    gravity: "bottom",
                    position:"left",
                    style: {
                    background: "linear-gradient(to top right, #ff8703,#ff4318,#f80404)",
                    }
                }).showToast();
            }
        });
    }
});


buttonCart.addEventListener('click', () => {
    pokeStorageArr = JSON.parse(localStorage.getItem('cartStorage'));
    
    Swal.fire({
        title: '<strong><h3>Carrito de compras </h3></strong>',
        html:
            `
            <div class="containerCart" id="divItemsCart"></div>
            <div id="totalCart"></div>
            `,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Comprar',
        showCancelButton: true,
        focusConfirm: false,
        grow: 'column', 
        position: 'bottom-end',
        buttonsStyling: false,
        customClass:{
            confirmButton: 'btn',
            cancelButton: 'btn',
        }
        
    })
    .then((result) => {
        if (result.isConfirmed) {
            if(cartArr.length != 0){
                cartArr = [];
                localStorage.setItem('cartStorage', JSON.stringify(cartArr))
                
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Tu compra ha sido realizada exitosamente',
                    showConfirmButton: false,
                    timer: 1500,
                    customClass:{
                        popup: 'successPopup'
                    } 
                });
            } else {
                Swal.fire({
                    position: 'center',
                    title: 'Tienes que agregar un producto al carritos',
                    showConfirmButton: false,
                    timer: 1500,
                    customClass:{
                        popup: 'successPopup'
                    } 
                });
            }
        } 
        
    });

    /* Cartas del carrito de compras */ 
    const divItemsCart = document.getElementById('divItemsCart');
    const totalCart = document.getElementById('totalCart');

    divItemsCart.innerHTML = " ";

    pokeStorageArr.forEach((pok, i) => {
        
        divItemsCart.innerHTML += `
        <div class="containerCartItem" id="${pok.name}">
            <div  class="cartImg">
                <img src="${pok.img}" alt="Imagen de ${pok.name}">
            </div>
            <div class="cartInfo">
                <h3 class="cartTitleItem">${pok.name}</h3>
                <div class="cartPriceItem">
                    <h4>Precio:</h4>
                    <strong><p id="pokPrice${i}">$${pok.price * pok.quant}</p></strong>
                </div>
                <div class="cartQuantItem">
                    <p>Cant: </p>
                    <input class="quantityCart" id="quantityCart${pok.id}" min="1" name="form-0-quantity" value="${pok.quant}" type="number" onfocus="this.blur()">
                </div>
            </div>
            <div class="cartDelete">
                <i class="fa-solid fa-trash-can fa-xl" id="deletePok${pok.name}"></i>
            </div>
        </div>
        `
    });

    /* Calculo del total del carrito */

    if (pokeStorageArr.length == 0) {
        totalCart.innerHTML = `
            <div class="emptyCart">
                <h3> El Carrito Esta Vacio</h3>                    
            </div>
        `;
    } else {
        totalCart.innerHTML = `
                <div class="totalCart">
                    <h3> Total: $${calcTotalPrice(pokeStorageArr)}</h3>                    
                </div>
        `;
    }
    /* Evento del input number */
    pokeStorageArr.forEach((pok, i) => {
        document.getElementById(`quantityCart${pok.id}`).addEventListener('input', (e)=>{
            cartArr[i].quant = parseFloat(e.data);
            localStorage.setItem('cartStorage', JSON.stringify(cartArr));
            document.getElementById(`pokPrice${i}`).innerHTML =  cartArr[i].quant * cartArr[i].price;
            totalCart.innerHTML = `
                <div class="totalCart">
                    <h3> Total: $${calcTotalPrice(cartArr)}</h3>                    
                </div>
            `;
        });
    });
    
    /* Evento click del array (boton de delete)*/ 
    pokeStorageArr.forEach((pok, i) => {  
        divItemsCart.addEventListener('click', (e) => {
            if (e.target && e.target.tagName === "I") {
                if (e.target.id === `deletePok${pok.name}`) {
                    cartArr = cartArr.filter(poke => !(poke.name == pok.name));  
                    localStorage.setItem('cartStorage', JSON.stringify(cartArr));
                    document.getElementById(`${pok.name}`).remove();

                    if (cartArr.length == 0) {
                        totalCart.innerHTML = `
                            <div class="emptyCart">
                                <h3> El Carrito Esta Vacio</h3>                    
                            </div>
                        `;
                    } else {
                        totalCart.innerHTML = `
                            <div class="totalCart">
                                <h3> Total: $${calcTotalPrice(cartArr)}</h3>                    
                            </div>
                        `;
                    }                      
                }
                
            }
            
            
        });
    });
});




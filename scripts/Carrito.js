
const buttonCart =  document.getElementById('buttonCart');
let cartArr = JSON.parse(localStorage.getItem('cartStorage')) ?? [];

const addPokToCart = (pok) => {
    const pokCart = cartArr.find(poke => poke.id == pok.id);

    if (pokCart){
        pokCart.quant++;
    } else {
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
            if (e.target.id === `addCart${pok.id}`) {
                addPokToCart(pok)
                localStorage.setItem('cartStorage', JSON.stringify(cartArr));
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
            <div class="totalCart" id="totalCart"></div>
            `,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Comprar',
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
        
        
    })
    .then((result) => {
        if (result.isConfirmed) {
            
            Swal.fire({
                title: '<strong><h3>Carrito de compras </h3></strong>',
                html:
                    `<h5>No se si es una buena idea</h5>`,
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Comprar',
                focusConfirm: false,
                width: '70%'  
            });
        } 
        
    });

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
                <h3>${pok.name}</h3>
                <h4>Precio:</h4>
                <strong><p>$${pok.price}</p></strong>
                <p>Cant: ${pok.quant}</p>
            </div>
            <div class="cartDelete">
                <i class="fa-solid fa-trash-can fa-xl" id="deletePok${pok.name}"></i>
            </div>
        </div>
        `
    });
    if (pokeStorageArr.length == 0) {
        totalCart.innerHTML = `
        <div>
        <h3> El Carrito Esta Vacio</h3>                    
        </div>
        `;
    } else {
        totalCart.innerHTML = `
                    <div>
                        <h3> Total: ${calcTotalPrice(pokeStorageArr)}</h3>                    
                    </div>
        `;
    }
    
    
    pokeStorageArr.forEach((pok, i) => {  
        divItemsCart.addEventListener('click', (e) => {
            if (e.target && e.target.tagName === "I") {
                if (e.target.id === `deletePok${pok.name}`) {
                    cartArr = cartArr.filter(poke => !(poke.name == pok.name));  
                    localStorage.setItem('cartStorage', JSON.stringify(cartArr));
                    document.getElementById(`${pok.name}`).remove();

                    if (cartArr.length == 0) {
                        totalCart.innerHTML = `
                        <div>
                        <h3> El Carrito Esta Vacio</h3>                    
                        </div>
                        `;
                    } else {
                        totalCart.innerHTML = `
                                    <div>
                                        <h3> Total: ${calcTotalPrice(cartArr)}</h3>                    
                                    </div>
                        `;
                    }                      
                }
                
            }
            
            
        });
    });
    
    
});




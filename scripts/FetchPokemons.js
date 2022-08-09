const divPokemons = document.getElementById('divPokemons');
const cart = [];

fetch("https://pokeapi.co/api/v2/pokemon/?limit=151")
.then(res => res.json())
.then (data => {
    data.results.forEach((pokemon, i) => {
        fetch(pokemon.url)
        .then(res => res.json())
        .then(({name, types, sprites}) => {
                divPokemons.innerHTML += `
                        <div class="pokemonCard" id="pokemon${i}">

                            <div class="cardHeader">
                                <h3>${name}</h3>
                                <h5>#${(i + 1).toString().padStart(3, 0)}</h5>
                            </div>
                            <div class="cardInfo">
                                <img src="${sprites.front_default}" alt="imagen de ${name}">
                            </div>
                            <div class="cardShop" id="cardShop">
                                <button id="buyPokemon">Comprar</button>
                                <i class="fa-solid fa-cart-plus fa-lg"></i>
                            </div>

                        </div>
                        `;
                    });
        });
    
    })
    .finally(() => {
        console.log(divPokemons.children.item(0))
    });





//<i class="fa-solid fa-trash-can fa-lg"></i> pa no olvidar
const divPokemons = document.getElementById('divPokemons');
const arrPok = [];

    fetch("https://pokeapi.co/api/v2/pokemon/?limit=151")
    .then(res => res.json())
    .then (data => {
        data.results.sort((a, b) => {
            if(a.id > b.id){
                return 1
            }
            if(a.id < b.id){
                return -1
            }
            return 0
        }).forEach((pokemon, i) => {
            fetch(pokemon.url)
            .then(res => res.json())
            .then(({id, name, sprites, types}) => {
    
                    divPokemons.innerHTML += `
                            <div class="pokemonCard" id="pokemon${i}">
    
                                <div class="cardHeader">
                                    <h3>${name}</h3>
                                    <h5>#${(id).toString().padStart(3, 0)}</h5>
                                </div>
                                <div class="cardInfo">
                                    <img src="${sprites.other.dream_world.front_default}" alt="imagen de ${name}">
                                </div>
                                <div class="cardShop" id="cardShop">
                                    <div>
                                        <h3>Precio:</h3>
                                        <strong><p> $${id}</p></strong>
                                    </div>
                                    <div>
                                        <button id="buyPok${i}">Comprar</button>
                                        <i class="fa-solid fa-cart-plus fa-lg" id="addCart${i}"></i>
                                    </div>
                                    
                                </div>
    
                            </div>
                            `;
                    let personaje = new Pokemon(id, name, sprites.other.dream_world.front_default, types);
                    arrPok.push(personaje);
                    
                });
            });
            
        });
        

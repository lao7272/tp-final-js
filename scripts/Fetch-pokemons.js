// import {Pokemon} from './Pokemon-class'
const next = document.getElementById('next');
const prev = document.getElementById('prev');
const divPokemons = document.getElementById('divPokemons');
const arrPok = [];

let startPoint = 1;
let limit = 9;

/* FUNCIONES*/ 

async function fetchPok (url){
                await fetch(url)
                .then(res => res.json())
                .then(({id, name, sprites, types}) => {

                    let pok = new Pokemon(id, name, sprites.other.dream_world.front_default, 1, types, 20);
                    const pokCart = arrPok.find(poke => poke.id == pok.id);
                    if (!pokCart){
                        arrPok.push(pok);
                    }            
                    
                    divPokemons.innerHTML += `
                        <div class="pokemonCard" id="pokemon${id}">
        
                            <div class="cardHeader">
                                <h3>${name} ${types[0].type.name}</h3>
                                <h5>#${(id).toString().padStart(3, 0)}</h5>
                            </div>
                            <div class="cardInfo">
                                <img src="${sprites.other.dream_world.front_default}" alt="imagen de ${name}">
                            </div>
                            <div class="cardShop" id="cardShop">
                                <div>
                                    <h3>Precio:</h3>
                                    <strong><p> $20</p></strong>
                                </div>
                                <div>
                                    <button id="buyPok${id}">Comprar</button>
                                    <i class="fa-solid fa-cart-plus fa-lg" id="addCart${id}"></i>
                                </div>
                                        
                            </div>
        
                        </div>
                        `;

                        
                    });
            }

function fetchEveryPok (startPoint, limit){
    for (let i = startPoint; i < startPoint + limit; i++) {
        fetchPok(` https://pokeapi.co/api/v2/pokemon/${i}`);
        
    }
}

/* BOTONES DE SIGUIENTE Y ANTERIOR*/ 
next.addEventListener('click', () => {
    startPoint += 9;
    divPokemons.innerHTML = "";
    fetchEveryPok(startPoint, limit);
});
prev.addEventListener('click', () => {
    if (startPoint != 1) {
        startPoint -= 9;
        divPokemons.innerHTML = "";
        fetchEveryPok(startPoint, limit);        
    }
});


fetchEveryPok(startPoint, limit);





//Obtener el elemento body a traves del DOM y asignarlo a la variables

const b = document.body

const pokemon = document.querySelector("#pokemon")
const pokedex = document.querySelector("#pokedex")
const pokedexCover = document.querySelector("#pokedex-cover")
const pokedexShadow = document.querySelector("#pokedex-shadow")
const pokemonAuthor = document.querySelector("#pokemon-author")

const arrowBack = document.querySelector("#arrow-back")
const arrowNext = document.querySelector("#arrow-next")
const pokemonNumber = document.querySelector("#pokemon-number")
const pokemonName = document.querySelector("#pokemon-name")
const pokemonImage = document.querySelector("#pokemon-image")
const pokemonTag = document.querySelectorAll(".pokemon-tag")
const pokemonstats = document.querySelector("#pokemon-stats")

let find = 1;
let con = -1
let cover = 0

// Funcion para rotar la pokedex
let pokedexFunc = (e) => {
    var x = e.pageX / window.innerWidth - 0.5
    var y = e.pageY / window.innerHeight - 0.5

    pokedex.style.transform = `
        perspective(10000px)
        rotateX(${ y * 10  + 55}deg)
        rotateZ(${ -x * 10 + 25}deg)
        translateZ(-5vw)
    `;
}

// Funcion para buscar pokemon
async function getPokemonFunc (e) {

    const url = `https://pokeapi.co/api/v2/pokemon/${find}`;
    let response = await fetch(url);

    if( e && e.currentTarget ){
        if (e.currentTarget.id == 'arrow-next' && con < 2) con++
        else if(e.currentTarget.id == 'arrow-back' && con > 0) con--
    }  

    if (response.status === 200) {  
        let data = await response.json();   
            pokemonNumber.innerText = data.id
            pokemonName.innerHTML =  data.forms[0].name
            pokemonImage.src = data.sprites.other.dream_world.front_default
            pokemonTag[0].innerHTML = "<p>Tipo</p>" + data.types[0].type.name
            pokemonTag[1].innerHTML = "<p>Habilidad</p>" + data.abilities[0].ability.name
            pokemonstats.innerHTML =  "<p>Estadisticas</p>" + "Ps: "+data.stats[0].base_stat +" ATK: "+data.stats[1].base_stat+
            "<br> DEF: "+data.stats[2].base_stat+ " SP.ATK: "+data.stats[3].base_stat+
            "<br> SP.DEF: "+data.stats[4].base_stat+ " SPEED: "+data.stats[5].base_stat
    }else{
        console.log('Ha ocurrido un error ' + response.error)
    }
}

// Funcion para abrir y cerrar la pokedex
let pokedexCoverFunc = () => {
    if (cover % 2 == 0) {
        pokemon.classList.remove('is-pokemon-hidden')
        pokemonNumber.classList.remove('is-pokemon-hidden')
        pokemonAuthor.classList.remove('is-pokemon-hidden')
        pokedexCover.classList.remove('is-pokedex-open')
        pokedexShadow.classList.remove('is-shadow-hidden')
    }
    else{
        pokemon.classList.add('is-pokemon-hidden')
        pokemonNumber.classList.add('is-pokemon-hidden')
        pokemonAuthor.classList.add('is-pokemon-hidden')
        pokedexCover.classList.add('is-pokedex-open')
        pokedexShadow.classList.add('is-shadow-hidden')

        pokemonNumber.innerText = ''
        pokemonName.innerText = ''
        pokemonImage.src = ''
        pokemonTag[0].innerText = ''
        pokemonTag[1].innerText = ''
        pokemonstats.innerText = ''
        con = -1
    }
    cover++
}




// Eventos
b.addEventListener("pointermove", pokedexFunc)

pokedexCover.addEventListener("click", pokedexCoverFunc)

arrowNext.addEventListener("click", function() {
    find++;
    getPokemonFunc();
  });
arrowBack.addEventListener("click", function() {
    find--;
    getPokemonFunc();
  });

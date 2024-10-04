
let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?imit=20';
//  difference between my creature parameter, and my pokemon parameter?
    function add(pokemon){

        if (typeof(pokemon) === 'object') {
            pokemonList.push(pokemon)
        }
    }
    
    function getAll(){
        return pokemonList
    }

    function addListItem(pokemon) {
        let unOList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button');
        // append the button to the list item as a child
        listItem.appendChild(button);
        // append the listItem to the unordered lists as its child 
        unOList.appendChild(listItem);
        // avoid placing a parameter in the addEventListener- as the parameter found in the 
        // code block is assigned to a different variable.  
        button.addEventListener('click', function() {
            showDetails(pokemon);
        })

    }

    function showDetails(pokemon) {
        console.log(pokemon.name);
        console.log('type:'+ ' '+ pokemon.height);    
        console.log('height:'+ ' '+ pokemon.height +' '+ 'm'); 

    }
    function loadList() {
        return fetch(apiUrl).then (function (response) {
            return response.json();
        }).then( function(json) {
            json.results.forEach(function(item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e)
            });
    }
    
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList
    };
})();

pokemonRepository.loadList().then(function() {

pokemonRepository.getAll().forEach(function(pokemon) {
    // calling the addListItem function into my for loop. this one line code simplifies 
    // everything-since all instructions are dynamically stored in a function.  
    pokemonRepository.addListItem(pokemon);
    });
});



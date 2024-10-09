
let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?imit=150';

    function add(pokemon){

        if (typeof(pokemon) === 'object') {
            pokemonList.push(pokemon)
        }
    }
    
    function getAll(){
        return pokemonList
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button');
        // append the button to the list item as a child
        listItem.appendChild(button);
        // append the listItem to the unordered lists as its child 
        pokemonList.appendChild(listItem);
        // avoid placing a parameter in the addEventListener- as the parameter found in the 
        // code block is assigned to a different variable.  
        button.addEventListener('click', function() {
            showDetails(pokemon);
        })

    }

    function showDetails(title, text, image) {
    
        let modalContainer = document.querySelector('#modal-container');

        let modal = document.createElement('div');
        modal.classList.add('modal');
        
        let closeButton = document.createElement('button');
        closeButton.classList.add('close-Button');
        closeButton.innerText = 'close';

        let pokemonName = document.createElement('h1');
        modalTitle.classList.add('title');
        modalTitle.innerText = title;

        let pokemonHeight = document.createElement('p');
        pokemonHeight.innerText = text

        let pokemonImage = document.createElement('img');

        modal.appendChild(closeButton);
        modal.appendChild(pokemonName);
        modal.appendChild(pokemonHeight);
        modal.appendChild(pokemonImage);
        modalContainer.appendChild(modal);
        pokemonList.appendChild(modalContainer);

        modalContainer.classList.add('.is-visible');
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

    function loadDetails(item) {
        // now we are iterating through the nested json object found
        //  in the url key of the resultsa object. 
        let url = item.detailsUrl;
        return fetch(url).then(function(response){
            return response.json();
        }).then(function(details){
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.type = details.types;
        }).catch(function(e) {
            console.error(e);
        });
    }
    
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();

pokemonRepository.loadList().then(function() {

pokemonRepository.getAll().forEach(function(pokemon) {
    // calling the addListItem function into my for loop. this one line code simplifies 
    // everything-since all instructions are dynamically stored in a function.  
    pokemonRepository.addListItem(pokemon);
    });
});



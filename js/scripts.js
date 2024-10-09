
let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?imit=150';
    let modalContainer = document.querySelector('#modal-container');

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

    function showModal(title, text, img) {
    
        let pokemonList = document.querySelector('.pokemon-list')
        let modal = document.createElement('div');
        modal.classList.add('modal');
        
        let closeButton = document.createElement('button');
        closeButton.classList.add('close-Button');
        closeButton.innerText = 'close';
        closeButton.addEventListener('click', hideModal);

        let pokemonName = document.createElement('h1');
        pokemonName.classList.add('title');
        pokemonName.innerText = title;

        let pokemonHeight = document.createElement('p');
        pokemonHeight.classList.add('text');
        pokemonHeight.innerText = text;

        let pokemonImage = document.createElement('img');
        pokemonImage.setAttribute('src', img);

        modal.appendChild(closeButton);
        modal.appendChild(pokemonName);
        modal.appendChild(pokemonHeight);
        modal.appendChild(pokemonImage);
        modalContainer.appendChild(modal);
        pokemonList.appendChild(modalContainer);

        modalContainer.classList.add('.is-visible');

        modalContainer.addEventListener('click', (e) => {
            let target = e.target;
            if(target === modalContainer) {
                hideModal();
            }
        });

        document.querySelector('#show-modal').addEventListener('click', () => {
            showModal(pokemonName, pokemonHeight, pokemonImage);
        });
    }

    function hideModal(){
    modalContainer.classList.remove('.is-visible');
    }

    window.addEventListener('keydown', (e) => {
        if(e.key === 'escape' && modalContainer.classList.contains('is-visible')){
            hideModal();
        };
    });



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

    // replace the console log in showDetails with the showModal()
    // within its parameters, add the corresponding key-values for their pokemon Image,
    // pokemon Height, and pokemon Name.

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function() {
            showModal(pokemon.name, pokemon.height, pokemon.imageUrl);
        })
    }
    
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails 
    };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        // calling the addListItem function into my for loop. this one line code simplifies 
        // everything-since all instructions are dynamically stored in a function.  
        pokemonRepository.addListItem(pokemon);
        });
});



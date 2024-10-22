
let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?imit=150';
    let modalContainer = document.getElementById('modal-container');


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
        listItem.classList.add('list-group-item');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button');
        button.classList.add('btn');
        button.classList.add('btn-light');
        button.setAttribute('data-toggle','modal');
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

    function loadList() {
        return fetch(apiUrl).then (function (response) {
            // if fetch is successful, then parse json data 
            // into a js object
            return response.json();
        }).then( function(json) {
            // if the parse is successful, then iterate through the 'result'
            // key of the json object. 
            json.results.forEach(function(item) {
            // due to the forEach(), its parameter 'item' is referencing each element within 
            // the json.results (AN ARRAY) the 'item' is an object and 
            // the name is a key of the 'item' object.
                let pokemon = {
                    // an object is created as the forEach() passes each element.
                    // using the values of the 'item's value. 
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
        // 'item' = pokemon object
        // this function: loadDetails() is using the data that was acted upon
        // by the last code of loadList(). therefore, 'item' refers to the pokemon object 
        // in the add() argument- the last code 
        let url = item.detailsUrl;
        // url is the pokemon.detailsUrl in the previous function.
        // this is a link to another api containing a json object- 
        // therefore need to parse again. 
        // url = pokemon.detailsUrl
        return fetch(url).then(function(response){
            return response.json();
        // 'response' = parsed pokemon.detailsUrl (an entire js object now)
        }).then(function(details){
            // details is the 
            //  here, we created two keys, dynamically. 
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.imageBack = details.sprites.back_default;
            item.imageShiny = details.sprites.front_shiny;
            item.type = details.types.map((element) => element.type.name);
           
            
        }).catch(function(e) {
            console.error(e);
        });
    }
    
// parameter is representing the pokemon.
// i replaced the parameter 'item' for 'pokemon' since it wasn't defined.
  function showModal(item) {
    let modalBody = $('.modal-body');
    let modalTitle= $('.modal-title');
    // let modalHeader= $('.modal-header');

    modalTitle.empty();
    modalBody.empty();

    let nameElement = $('<h1>'+ item.name +'</h1>');
    
    let imageElementFront = $('<img class="modal-img" style="width: 30%">');
    imageElementFront.attr('src', item.imageUrl);
    let imageElementBack = $('<img class= "modal-img" style= "width: 30%">');
    imageElementBack.attr('src', item.imageBack);
    let imageElementShiny = $('<img class= modal-img style= "width: 30%">');
    imageElementShiny.attr('src', item.imageShiny);

    let heightElement = $('<p>' + 'Height :' + item.height + '</p>');
    let typeElement = $('<p>' + 'Type(s) :' + item.type +'</p>'); 

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(imageElementShiny);
    modalBody.append(heightElement);
    modalBody.append(typeElement);
    
    // FEEDBACK CODE
    modalContainer.classList.add('is-visible');
    modalContainer.classList.add('show');
  };

    function hideModal(){
    modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
        if(e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
            hideModal();
        };
    });

// needs to be more specific to prevent closing the modal 
// if the user clicked on the modal itself. 'e' is the event object.
    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if(target === modalContainer) {
            hideModal();
        }
    });

// using jQuery syntax to add an event listener on the 
// modal's closing button
    $('.close').on('click', (e) => {
        if(modalContainer) {
            hideModal();
        }
    });

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function() {
            showModal(pokemon);
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

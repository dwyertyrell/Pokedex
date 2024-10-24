
let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?imit=150';
    let modalContainer = document.querySelector('.modal-container');


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
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);  
        button.addEventListener('click', function() {
            showDetails(pokemon);
        })

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
       
        let url = item.detailsUrl;
        
        return fetch(url).then(function(response){
            return response.json();
        }).then(function(details){
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.imageBack = details.sprites.back_default;
            item.imageShiny = details.sprites.front_shiny;
            item.type = details.types.map((element) => element.type.name);
           
            
        }).catch(function(e) {
            console.error(e);
        });
    }
    

  function showModal(item) {
    let modalBody = $('.modal-body');
    let modalTitle= $('.modal-title');

    modalTitle.empty();
    modalBody.empty();

    let nameElement = $('<h1>'+ item.name +'</h1>');
    
    let imageElementFront = $('<img class="modal-img" style="width: 30%">');
    imageElementFront.attr('src', item.imageUrl);
    let imageElementBack = $('<img class= "modal-img" style= "width: 30%">');
    imageElementBack.attr('src', item.imageBack);
    let imageElementShiny = $('<img class= modal-img style= "width: 30%">');
    imageElementShiny.attr('src', item.imageShiny);

    let heightElement = $('<p>' + 'Height :' + item.height + ' '+'m' + '</p>');
    let typeElement = $('<p>' + 'Type(s) :' + item.type +'</p>'); 

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(imageElementShiny);
    modalBody.append(heightElement);
    modalBody.append(typeElement);
    
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


    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if(target === modalContainer) {
            hideModal();
        }
    });

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
        pokemonRepository.addListItem(pokemon);
        });
});

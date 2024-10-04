
let pokemonRepository = (function() {
    let pokemonList = [
        {name: 'Charmeleon', type: ['fire'], height: 1.1},
        {name:'Blastoise', type: ['water'], height: 1.6}, 
        {name: 'Weedle', type: ['bug', 'poison'], height: 0.3}, 
        {name: 'Venusaur', type: ['grass', 'poison'], height: 2.0}
    ];
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
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
    };
})();

pokemonRepository.add({name: 'Ekans', type: ['poison'], height: 2});

// we are accessing each object as an element within the array. Therefore, the parameter of the forEach()
// acting on the array, can be used as a reference point for the objects- via dot notation. 

// the parameter is also referencing the same object of the parameter: pokemon. 
// therefore can replace creature with pokemon- no need to have two names for the same reference. 

pokemonRepository.getAll().forEach(function(pokemon) {
    // calling the addListItem function into my for loop. this one line code simplifies 
    // everything-since all instructions are dynamically stored in a function.  
    pokemonRepository.addListItem(pokemon);
});
    



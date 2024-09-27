
let pokemonRepository = (function() {
    let pokemonList = [
        {name: 'Charmeleon', type: ['fire'], height: 1.1},
        {name:'Blastoise', type: ['water'], height: 1.6}, 
        {name: 'Weedle', type: ['bug', 'poison'], height: 0.3}, 
        {name: 'Venusaur', type: ['grass', 'poison'], height: 2.0}
    ];
//  difference between my creature parameter, and my pokemon parameter
    function add(pokemon){

        if (typeof(pokemon) === 'object') {
            pokemonList.push(pokemon)
        }
    }
    
    function getAll(){
        return pokemonList
    }

    return {
        add: add,
        getAll: getAll,
    };
})();

pokemonRepository.add({name: 'Ekans', type: ['poison'], height: 2});
console.log(pokemonRepository.getAll());

// we are accessing each object as an element within the array. Therefore, the parameter of the forEach()
// acting on the array, can be used as a reference point for the objects- via dot notation.   
let list = pokemonRepository.getAll();

// why did JavaScript make me use an intermediate variable to work with the forEach()? 
list.forEach(function(creature) {


    let unOList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = creature.name;
    button.classList.add('button');
    // append the button to the list item as a child
    listItem.appendChild(button);
    // append the listItem to the unordered lists as its child 
    unOList.appendChild(listItem)

    });
    




let pokemonRepository = (function() {
    let pokemonList = [
        {name: 'Charmeleon', type: ['fire'], height: 1.1},
        {name:'Blastoise', type: ['water'], height: 1.6}, 
        {name: 'Weedle', type: ['bug', 'poison'], height: 0.3}, 
        {name: 'Venusaur', type: ['grass', 'poison'], height: 2.0}
    ];

    function add(pokemon){
        pokemonList.push(pokemon)
        }
    function getAll(){
        return pokemonList
            }
    return {
        add: add,
        getAll: getAll
    };
})();

pokemonRepository.add({name: 'Ekans', type: ['poison'], height: 2});
console.log(pokemonRepository.getAll());

// we are accessing each object as an element within the array. Therefore, the parameter of the forEach()
// acting on the array, can be used as a reference point for the objects- via dot notation.   
let list = pokemonRepository.getAll();

// why did JavaScript make me use an immediate variable to work with the forEach()? 
list.forEach(function(creature) {


    if (creature.height > 1.5) {
            document.write( '<p>' + creature.name + '-' + ' ' + 'Wow, this pokemon is tall!' + '</p>'); 
        }
        else {
            document.write( '<p>' + creature.name + ' ' + '(' + ' ' + creature.height + ' ' + ')' + '</p>');

        }
    });



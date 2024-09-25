
let pokemonRepository = (function() {
    let pokemonList = [
        {name: 'Charmeleon', type: ['fire'], height: 1.1},
        {name:'Blastoise', type: ['water'], height: 1.6}, 
        {name: 'Weedle', type: ['bug', 'poison'], height: 0.3}, 
        {name: 'Venusaur', type: ['grass', 'poison'], height: 2.0}
    ];

    return {
        add: function(pokemon){
        pokemonList.push(pokemon)
        },

        getAll: function(){
        return pokemonList
        }
    };
})();

pokemonRepository.add({name: Ekans, type: [poison], height: 2});

// we are accessing each object as an element within the array. Therefore, the parameter of the forEach()
// acting on the array, can be used as a reference point for the objects- via dot notation.   
pokemonList.forEach(function(creature) {;

    document.write( '<p>' + creature.name + ' ' +'('+' ' + creature.height + ' ' + ')' + '</p>');

    if (creature.height > 1.5) {
            document.write(creature.name + '-' + ' ' + 'Wow, this pokemon is tall!' + ' '); 
        }
    });



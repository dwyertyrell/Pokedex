let pokemonList = [
    {name: 'Charmeleon', type: ['fire'], height: 1.1},
    {name:'Blastoise', type: ['water'], height: 1.6}, 
    {name: 'Weedle', type: ['bug', 'poison'], height: 0.3}, 
    {name: 'Venusaur', type: ['grass', 'poison'], height: 2.0}
];

pokemonList.forEach(function(creature) {;
    // althought the object is inside the array, it's okay- because the forEach will give us individaul 
    //  access to each element withing the array, through iteration.
    // but how to access the properties of the objects? 
    document.write( '<p>' + creature.name + ' ' +'('+' ' + creature.height + ' ' + ')' + '</p>');

    if (creature.height > 1.5) {
            document.write(creature.name + '-' + ' ' + 'Wow, this pokemon is tall!' + ' '); 
        }
    });

// for ( let i= 0; i < pokemonList.length; i++) {
    
//     document.write( '<p>' + pokemonList[i].name + ' ' +'('+' ' + pokemonList[i].height + ' ' + ')' + '</p>');

    // if (pokemonList[i].height > 1.5) {
    //     document.write( pokemonList[i].name + '-' + ' ' + 'Wow, this pokemon is tall!' + ' ');
//     }
// }

let pokemonList = [
    {name: 'Charmeleon', type: ['fire'], height: 1.1},
    {name:'Blastoise', type: ['water'], height: 1.6}, 
    {name: 'Weedle', type: ['bug', 'poison'], height: 0.3}, 
    {name: 'Venusaur', type: ['grass', 'poison'], height: 2.0}
];

for ( let i= 0; i < pokemonList.length; i++) {
    
    document.write(pokemonList[i].name + '('+' ' + pokemonList[i].height + ' ' + ')' + ' ');

    if (pokemonList[i].height > 1.5) {
        document.write( pokemonList[i].name + '-' + ' ' + 'Wow, this pokemon is tall!' + ' ');
    }
}

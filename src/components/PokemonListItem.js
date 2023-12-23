// PokemonListItem.js
import React from "react";

function PokemonListItem({ pokemon, onClick }) {
  return (
    <div className="pokemon-list-item" onClick={() => onClick(pokemon)}>
      <img src={pokemon.imageUrl} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
    </div>
  );
}

export default PokemonListItem;

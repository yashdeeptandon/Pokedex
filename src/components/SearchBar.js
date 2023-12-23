import React, { useState, useEffect } from "react";
import { fetchPokemonList } from "../utils/api";
import PokemonCard from "./PokemonCard";
import "./SearchBar.css";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    loadPokemonList();
  }, []);

  useEffect(() => {
    filterPokemonList();
  }, [searchTerm, pokemonList]);

  const loadPokemonList = async () => {
    const data = await fetchPokemonList();
    setPokemonList(data);
    setFilteredPokemonList(data);
  };

  const filterPokemonList = () => {
    if (searchTerm.trim() === "") {
      setFilteredPokemonList(pokemonList);
    } else {
      const filtered = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPokemonList(filtered);
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search Pokemon by name or ID"
        className="search-input"
      />
      <div className="pokemon-list">
        {filteredPokemonList.map((pokemon, index) => (
          <PokemonCard key={index} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default SearchBar;

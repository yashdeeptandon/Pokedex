import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import PokemonCard from "./components/PokemonCard";
import PokemonDetailModal from "./components/PokemonDetailModal";
import { fetchPokemonList, fetchPokemonDetail } from "./utils/api";
import { Container, Row } from "react-bootstrap";
import "./App.css";

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    loadPokemonList();
  }, []);

  const loadPokemonList = async () => {
    const data = await fetchPokemonList();
    setPokemonList(data);
  };

  const handlePokemonClick = async (pokemonId) => {
    const data = await fetchPokemonDetail(pokemonId);
    setSelectedPokemon(data);
  };

  const handleCloseModal = () => {
    setSelectedPokemon(null);
  };

  return (
    <Container>
      <Row>
        <SearchBar />
      </Row>
      <div className="pokemon-card-container">
        {pokemonList.map((pokemon, index) => (
          <PokemonCard
            key={index}
            pokemon={pokemon}
            onPokemonClick={handlePokemonClick}
          />
        ))}
      </div>
      {selectedPokemon && (
        <PokemonDetailModal
          pokemon={selectedPokemon}
          onCloseModal={handleCloseModal}
        />
      )}
    </Container>
  );
};

export default App;

import React, { useState } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import PokemonDetailModal from "./PokemonDetailModal";
import "./PokemonCard.css";

const PokemonCard = ({ pokemon }) => {
  const { name, url } = pokemon;

  const getPokemonId = () => {
    const urlParts = url.split("/");
    return urlParts[urlParts.length - 2];
  };

  const pokemonId = getPokemonId();
  const imageUrl = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemonId}.svg`;

  const [showDetails, setShowDetails] = useState(false);
  const [pokemonDetails, setPokemonDetails] = useState(null);


  const fetchPokemonDetails = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
      );
      setPokemonDetails(response.data);
    } catch (error) {
      console.error("Error fetching Pokemon details:", error);
    }
  };

  const handleViewDetails = async () => {
    await fetchPokemonDetails();
    setShowDetails(true);
  };

  return (
    <div className="pokemon-card-wrapper">
      <Card className="pokemon-card" style={{ width: "18rem" }}>
        <Card.Img variant="top" src={imageUrl} alt={name} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>ID: {pokemonId}</Card.Text>
          <Button variant="primary" onClick={handleViewDetails}>
            View Details
          </Button>
        </Card.Body>
      </Card>
      {showDetails && (
        <PokemonDetailModal
          show={showDetails}
          onHide={() => setShowDetails(false)}
          pokemon={pokemonDetails}
        />
      )}
    </div>
  );
};

export default PokemonCard;

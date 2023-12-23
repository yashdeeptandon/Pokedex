const BASE_URL = "https://pokeapi.co/api/v2";

export const fetchPokemonList = async (offset = 0, limit = 151) => {
  const response = await fetch(
    `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`
  );
  const data = await response.json();
  return data.results;
};

export const fetchPokemonDetail = async (pokemonName) => {
  const response = await fetch(`${BASE_URL}/pokemon/${pokemonName}`);
  const data = await response.json();
  return data;
};

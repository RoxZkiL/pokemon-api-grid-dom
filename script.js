const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=21";

async function dataFetch() {
  try {
    const data = await fetch(apiUrl);
    const response = await data.json();
    const pokemonData = response.results.map((data) => data.url);
    const pokemonArray = [];

    for (const pokemon of pokemonData) {
      const fetchingPokeImg = await fetch(pokemon);
      const fetchedResponse = await fetchingPokeImg.json();
      const pokemonObj = {
        name:
          fetchedResponse.name.charAt(0).toUpperCase() +
          fetchedResponse.name.slice(1),
        img: fetchedResponse.sprites.front_default,
        abilities: fetchedResponse.abilities
          .map((x) => x.ability.name)
          .join(", "),
        types: fetchedResponse.types.map((x) => x.type.name).join(", "),
      };

      pokemonArray.push(pokemonObj);
    }

    return pokemonArray;
  } catch (error) {
    console.log("Hubo un error al cargar tus Pokemons", error);
    return [];
  }
}

dataFetch().then((finalPokemonArray) => {
  console.log(finalPokemonArray);
});

async function renderPokemonCards() {
  const pokemonGrid = document.getElementById("pokemonGrid");

  try {
    const pokemons = await dataFetch();

    pokemons.forEach((pokemon) => {
      const card = document.createElement("div");
      card.classList.add("card");

      const image = document.createElement("img");
      image.src = pokemon.img;
      image.alt = pokemon.name;

      const name = document.createElement("h3");
      name.textContent = pokemon.name;

      const abilities = document.createElement("p");
      abilities.textContent = `Abilities: ${pokemon.abilities}`;

      const types = document.createElement("p");
      types.textContent = `Types: ${pokemon.types}`;

      card.appendChild(image);
      card.appendChild(name);
      card.appendChild(abilities);
      card.appendChild(types);

      pokemonGrid.appendChild(card);
    });
  } catch (error) {
    console.error("Error al renderizar las tarjetas de Pokémon:", error);
  }
}

renderPokemonCards();

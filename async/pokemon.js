//https://www.geeksforgeeks.org/underscore-js-_-sample-function/
$(function () {
  let baseURL = "https://pokeapi.co/api/v2";

  // 1.
  async function getPokemon() {
    const res = await axios.get(`${baseURL}/pokemon/?limit=10`);
    console.log(res.data);
  }
  //getPokemon();

  // 2.
  async function get3Pokemons(num) {
    const res = await axios.get(`${baseURL}/pokemon/?limit=100`);
    const pokemons = _.sample(res.data.results, num);
    /*pokemons.forEach((pokemon) => {
      console.log(pokemon);
    });*/
    return pokemons;
  }
  //get3Pokemons(3);

  // 3.
  async function getEntries(num) {
    const pokemons = await get3Pokemons(num);
    const pokemonPromises = await Promise.all(
      pokemons.map((pokemon) => axios.get(pokemon.url))
    );
    //pokemonPromises.forEach((p) => console.log(p.data.species.url));
    const speciesUrl = pokemonPromises.map((p) => p.data.species.url);
    const speciesPromises = await Promise.all(
      speciesUrl.map((url) => axios.get(url))
    );
    speciesPromises.forEach((s) => {
      if (s.data.flavor_text_entries.length === 0) {
        console.log("No description available.");
      } else {
        const flavorSample = s.data.flavor_text_entries.find(function (entry) {
          return entry.language.name === "en";
        });
        const result = flavorSample
          ? flavorSample.flavor_text
          : "No description available.";
        console.log(result);
      }
    });
  }
  //getEntries(3);

  //previous solution
  /*let names = null;
  $.getJSON(`${baseURL}/pokemon/?limit=1000`)
    .then((data) => {
      let randomPokemonUrls = [];
      for (let i = 0; i < 3; i++) {
        let randomIdx = Math.floor(Math.random() * data.results.length);
        let url = data.results.splice(randomIdx, 1)[0].url;
        randomPokemonUrls.push(url);
      }
      return Promise.all(randomPokemonUrls.map((url) => $.getJSON(url)));
    })
    .then((data) => {
      names = data.map((d) => d.name);
      return Promise.all(data.map((d) => $.getJSON(d.species.url)));
    })
    .then((data) => {
      let descriptions = data.map((d) => {
        let descriptionObj = d.flavor_text_entries.find(
          (entry) => entry.language.name === "en"
        );
        return descriptionObj
          ? descriptionObj.flavor_text
          : "No description available.";
      });
      descriptions.forEach((desc, i) => {
        console.log(`${names[i]}: ${desc}`);
      });
    });*/

  // 4.

  //previous solution
  let $btn = $("button");
  let $pokeArea = $("#pokemon-area");

  /*$btn.on("click", function () {
    $pokeArea.empty();
    let namesAndImages = [];
    $.getJSON(`${baseURL}/pokemon/?limit=1000`)
      .then((data) => {
        let randomPokemonUrls = [];
        for (let i = 0; i < 3; i++) {
          let randomIdx = Math.floor(Math.random() * data.results.length);
          let url = data.results.splice(randomIdx, 1)[0].url;
          randomPokemonUrls.push(url);
        }
        return Promise.all(randomPokemonUrls.map((url) => $.getJSON(url)));
      })
      .then((pokemonData) => {
        namesAndImages = pokemonData.map((p) => ({
          name: p.name,
          imgSrc: p.sprites.front_default,
        }));
        return Promise.all(pokemonData.map((p) => $.getJSON(p.species.url)));
      })
      .then((speciesData) => {
        speciesData.forEach((d, i) => {
          let descriptionObj = d.flavor_text_entries.find(function (entry) {
            return entry.language.name === "en";
          });
          let description = descriptionObj ? descriptionObj.flavor_text : "";
          let { name, imgSrc } = namesAndImages[i];
          $pokeArea.append(makePokeCard(name, imgSrc, description));
        });
      });
  });*/

  $btn.on("click", async function () {
    $pokeArea.empty();
    let namesAndImages = [];
    const res = await axios.get(`${baseURL}/pokemon/?limit=1000`);
    let randomPokemonUrls = _.sample(res.data.results, 3).map(
      (entry) => entry.url
    );
    const data = await Promise.all(
      randomPokemonUrls.map((url) => $.getJSON(url))
    );
    namesAndImages = data.map((p) => ({
      name: p.name,
      imgSrc: p.sprites.front_default,
    }));
    const flavors = await Promise.all(
      data.map((p) => axios.get(p.species.url))
    );
    const flavorsData = flavors.map((entry) => entry.data);
    flavorsData.forEach((d, i) => {
      let descriptionObj = d.flavor_text_entries.find(function (entry) {
        return entry.language.name === "en";
      });
      let description = descriptionObj ? descriptionObj.flavor_text : "";
      let { name, imgSrc } = namesAndImages[i];
      $pokeArea.append(makePokeCard(name, imgSrc, description));
    });
  });

  function makePokeCard(name, imgSrc, description) {
    return `
          <div class="card">
            <h1>${name}</h1>
            <img src=${imgSrc} />
            <p>${description}</p>
          </div>
        `;
  }
});

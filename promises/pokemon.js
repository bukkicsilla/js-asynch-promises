$(function () {
  let baseURL = "https://pokeapi.co/api/v2";

  // 1.
  /*$.getJSON(`${baseURL}/pokemon/?limit=1000`).then((data) => {
    console.log(data);
  });*/

  let base_url = "https://pokeapi.co/api/v2";
  axios.get(`${base_url}/pokemon/?limit=10`).then((res) => {
    console.log(res.data);
  });
  // 2.
  /*$.getJSON(`${baseURL}/pokemon/?limit=1000`)
    .then((data) => {
      let randomPokemonUrls = [];
      for (let i = 0; i < 1; i++) {
        let randomIdx = Math.floor(Math.random() * data.results.length);
        let url = data.results.splice(randomIdx, 1)[0].url;
        randomPokemonUrls.push(url);
      }
      return Promise.all(randomPokemonUrls.map((url) => $.getJSON(url)));
    })
    .then((pokemon) => {
      pokemon.forEach((p) => console.log(p));
    });*/
  axios
    .get(`${base_url}/pokemon/?limit=10`)
    .then((res) => {
      let randUrls = [];
      for (let i = 0; i < 1; i++) {
        let idx = Math.floor(Math.random() * res.data.results.length);
        let newUrl = res.data.results.splice(idx, 1)[0].url;
        randUrls.push(newUrl);
      }
      return Promise.all(randUrls.map((url) => axios.get(url)));
    })
    .then((pokemon) => {
      pokemon.forEach((p) => console.log(p.data));
    });

  // 3.
  let names = null;
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
    });

  // 4.
  let $btn = $("button");
  let $pokeArea = $("#pokemon-area");

  $btn.on("click", function () {
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

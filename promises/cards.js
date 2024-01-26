const base_url = "https://deckofcardsapi.com/api/deck/";
const deck_url = `${base_url}new/shuffle/?deck_count=1`;

//Step 1 with JQuery
let deck_id = "";
$.getJSON(deck_url, (res) => {
  deck_id = res.deck_id;
  const card_url = `${base_url}${deck_id}/draw/?count=1`;
  $.getJSON(card_url, (res) => {
    let s = res.cards[0].suit;
    let v = res.cards[0].value;
    //console.log(`${v} of ${s}`.toLowerCase());
  });
});

//Step 1 with axios
axios
  .get(deck_url)
  .then((res) => {
    deck_id = res.data.deck_id;
    const card_url_axios = `${base_url}${deck_id}/draw/?count=1`;
    axios.get(card_url_axios).then((res) => {
      let { suit, value } = res.data.cards[0];
      //console.log(`${value} of ${suit}`);
    });
  })
  .catch((err) => console.log(err));

//Step 2 with axios
axios.get(deck_url).then((res) => {
  deck_id = res.data.deck_id;
  let cardPromises = [];
  for (i = 1; i < 3; i++) {
    cardPromises.push(axios.get(`${base_url}${res.data.deck_id}/draw`));
  }
  Promise.all(cardPromises)
    .then((cardArr) => {
      for (result of cardArr) {
        let { suit, value } = result.data.cards[0];
        //console.log(`${value} of ${suit}`);
      }
    })
    .catch((err) => console.log(err));
});

//Step 3 with axios, it is slow
/*const $btn = $("button");
const NUM_CARDS = 13;
const DEG_CHANGE = 15;
let cards = [];
axios.get(deck_url).then((res) => {
  deck_id = res.data.deck_id;
  let cardPromises = [];
  for (i = 0; i < NUM_CARDS; i++) {
    cardPromises.push(axios.get(`${base_url}${res.data.deck_id}/draw`));
  }
  Promise.all(cardPromises)
    .then((cardArr) => {
      for (result of cardArr) {
        cards.push(image);
      }
      $btn.show();
    })
    .catch((err) => console.log(err));
});
let deg = 0;
$btn.on("click", function () {
  let idx = Math.floor(Math.random() * cards.length);
  let $card = cards[idx];
  const $img = $("<img>")
    .attr({ src: $card, alt: "card" })
    .css("transform", `rotate(${deg}deg`);
  $("div").append($img);
  deg += DEG_CHANGE;
  cards.splice(idx, 1);
  if (cards.length === 0) {
    $btn.hide();
  }
});*/

//step 3 with axios, it is fast
const $btn = $("button");
const DEG_CHANGE = 15;

axios
  .get(deck_url)
  .then((res) => {
    deck_id = res.data.deck_id;
    $btn.show();
  })
  .catch((err) => console.log(err));

let deg = 0;
$btn.on("click", function () {
  axios.get(`${base_url}${deck_id}/draw`).then((res) => {
    if (res.data.cards.length === 0) {
      $btn.hide();
    }
    let { suit, value, image } = res.data.cards[0];
    const $img = $("<img>")
      .attr({ src: image, alt: `${value} of ${suit}` })
      .css("transform", `rotate(${deg}deg`);
    $("div").append($img);
    deg += DEG_CHANGE;
  });
});

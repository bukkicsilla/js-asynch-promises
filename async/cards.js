const base_url = "https://deckofcardsapi.com/api/deck/";
const deck_url = `${base_url}new/shuffle/?deck_count=1`;

//Step 1
async function getCard() {
  try {
    const res = await axios.get(deck_url);
    let { deck_id } = res.data;
    const res2 = await axios.get(`${base_url}${deck_id}/draw/?count=1`);
    let { suit, value } = res2.data.cards[0];
    console.log(`${value} of ${suit}`);
  } catch (e) {
    console.log("Error", e);
  }
}
getCard();

//Step 2
async function getCards() {
  const res = await axios.get(deck_url);
  const { deck_id } = res.data;
  const cards = await Promise.all([
    axios.get(`${base_url}${deck_id}/draw`),
    axios.get(`${base_url}${deck_id}/draw`),
  ]);
  cards.forEach((card) => {
    let { suit, value } = card.data.cards[0];
    console.log(`${value} of ${suit}`);
  });
}
getCards();

//Step 3
async function getCardHTML() {
  const $btn = $("button");
  const DEG_CHANGE = 15;
  const res = await axios.get(deck_url);
  let { deck_id } = res.data;
  $btn.show();
  let deg = 0;
  $btn.on("click", async function () {
    const res2 = await axios.get(`${base_url}${deck_id}/draw`);
    if (res2.data.cards.length === 0) $btn.hide();
    let { suit, value, image } = res2.data.cards[0];
    const $img = $("<img>")
      .attr({ src: image, alt: `${value} of ${suit}` })
      .css("transform", `rotate(${deg}deg`);
    $("div").append($img);
    deg += DEG_CHANGE;
  });
}

getCardHTML();

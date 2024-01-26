//Part 1
const base_url = "http://numbersapi.com/";
//1.
const num = 1000000;
axios
  .get(`${base_url}${num}`, (headers = { "Content-Type": "application/json" }))
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => console.log(err));

//2.
let multi_url = "http://numbersapi.com/1..10";
axios
  .get(multi_url, (headers = { "Content-Type": "application/json" }))
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => console.log(err));

const arr = [42, 69, 74, 2024];
axios
  .get(`${base_url}${arr}`, (headers = { "Content-Type": "application/json" }))
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => console.log(err));

//3.
let favNum = 100;
let numberPromises = [];
for (let i = 0; i < 4; i++) {
  numberPromises.push(
    axios.get(
      `${base_url}${favNum}`,
      (headers = { "Content-Type": "application/json" })
    )
  );
}
Promise.all(numberPromises)
  .then((numArr) => {
    for (res of numArr) {
      console.log(res.data);
    }
  })
  .catch((err) => console.log(err));

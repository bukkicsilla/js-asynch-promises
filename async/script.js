//Part 1
const baseURL = "http://numbersapi.com/";
//1.
const num = 27;

async function getNumber() {
  try {
    const res = await axios.get(
      `${baseURL}${num}`,
      (headers = { "Content-Type": "application/json" })
    );
    console.log(res.data);
  } catch (e) {
    (e) => console.log(e);
  }
}
getNumber();

/************************************************************************** */
//2.
let multiURL = "http://numbersapi.com/1..10";

async function getNumbers() {
  const res = await axios.get(
    multiURL,
    (headers = { "Content-Type": "application/json" })
  );
  console.log(res.data);
}
getNumbers();

const arr = [42, 69, 74, 2024];
async function getMulti(arr) {
  const res = await axios.get(
    `${baseURL}${arr}`,
    (headers = { "Content-Type": "application/json" })
  );
  console.log(res.data);
}
getMulti(arr);

/****************************************************************** */
//3.
let favNum = 100;
let numberPromises = [];
async function getFacts(num) {
  for (let i = 0; i < 4; i++) {
    const response = await axios.get(
      `${baseURL}${num}`,
      (headers = { "Content-Type": "application/json" })
    );
    numberPromises.push(response);
  }
  const result = await Promise.all(numberPromises);
  for (let res of result) {
    console.log(res.data);
  }
}
getFacts(100);

async function part3(num) {
  let facts = await Promise.all([
    axios.get(
      `${baseURL}${num}`,
      (headers = { "Content-Type": "application/json" })
    ),
    axios.get(
      `${baseURL}${num}`,
      (headers = { "Content-Type": "application/json" })
    ),
    axios.get(
      `${baseURL}${num}`,
      (headers = { "Content-Type": "application/json" })
    ),
    axios.get(
      `${baseURL}${num}`,
      (headers = { "Content-Type": "application/json" })
    ),
  ]);
  facts.forEach((fact) => console.log(fact.data));
}
part3(100);

"use strict";

const xhr = new XMLHttpRequest();

console.dir(xhr);

xhr.onload = function () {
  console.log(`Статус: ${xhr.status}; Результат: ${xhr.response}`);
};

const input = document.querySelector("input");
const button = document.querySelector("button");
const paragraph = document.querySelector("p");

button.addEventListener("click", () => {
  if (+input.value < 1 || +input.value > 10) {
    paragraph.textContent = "число вне диапазона от 1 до 10";
  } else {
    xhr.open(
      "get",
      `https://jsonplaceholder.typicode.com/photos?_limit=${input.value}`,
      true
    );
    xhr.send();
  }

  console.log(localStorage.getItem("currentValue"));
});

const request = fetch("https://mate.academy/students-api/users");

request
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.log(err.message))
  .finally(() => console.log("Loading is complete"));

// async function() {}

const loadData = async () => {
  try {
    const response = await fetch("https://mate.academy/students-api/users");
    const data = await response.json();
    console.log(data, " this is async/await");
  } catch (error) {
    console.log(err.message);
  } finally {
    console.log("Loading is complete");
  }
};

loadData();

"use strict";

const BASE_URL = "https://dummyimage.com/";

const form = document.querySelector(".form");

const imgHeight = form.querySelector(".img-height");
const imgWidth = form.querySelector(".img-width");
const button = form.querySelector(".button");

const errorMessage = document.querySelector(".error-message");
const imageContainer = document.querySelector(".image-container");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  errorMessage.textContent = "";
  imageContainer.innerHTML = "";

  const heightValue = +imgHeight.value || 0;
  const widthValue = +imgWidth.value || 0;

  if (
    heightValue < 100 ||
    heightValue > 300 ||
    widthValue < 100 ||
    widthValue > 300
  ) {
    errorMessage.textContent = "одно из чисел вне диапазона от 100 до 300";
    errorMessage.style.color = "red";

    return;
  }

  try {
    const response = await fetch(`${BASE_URL}${widthValue}x${heightValue}/`);

    // const data = await response.json();
    const image = document.createElement("img");
    image.src = `${BASE_URL}${widthValue}x${heightValue}/`;

    imageContainer.append(image);
  } catch (error) {
    console.log(error);
  }
});



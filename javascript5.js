"use strict";

const RANGE_START = 1;
const RANGE_END = 10;
const BASE_URL = "https://jsonplaceholder.typicode.com/photos?_";

const form = document.querySelector(".form");
const { pageNumber, limit, submitBtn } = form.elements;
const errorMessage = document.querySelector(".error-message");
const photos = document.querySelector(".photos");

const photosFromLS = localStorage.getItem("photos");

if (photosFromLS) {
  const data = JSON.parse(photosFromLS);

  render(data, photos)
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  resetPage();

  const pageValue = pageNumber.value;
  const limitValue = limit.value;

  if (checkForm(pageValue, limitValue)) {
    errorMessage.textContent = hasError;
    return;
  }

  try {
    const response = await fetch(
      `${BASE_URL}page=${pageValue}&_limit=${limitValue}`
    );

    const data = await response.json();
    // writing response to localStorage
    localStorage.setItem("photos", JSON.stringify(data));
   
    render(data, photos)
  } catch (error) {
    console.log(error);
  }
});

function checkForm(page, limit) {
  const isPageValid = checkRange(page);
  const isLimitValid = checkRange(limit);
  if (!isPageValid && !isLimitValid) {
    return "Номер страницы и лимит вне диапазона от 1 до 10";
  }

  if (!isPageValid) {
    return "Номер страницы вне диапазона от 1 до 10";
  }

  if (!isLimitValid) {
    return "Лимит вне диапазона от 1 до 10";
  }

  return "";
}

function checkRange(number) {
  return +number && +number >= RANGE_START && +number <= RANGE_END;
}

function render(data, element) {
  element.innerHTML = data
    .map((image) => `<img src="${image.url}" alt="${image.title}">`)
    .join("");
}

function resetPage() {
  errorMessage.textContent = "";
  photos.innerHTML = "";
}

// // CREATE DATA IN LOCAL STORAGE
// localStorage.setItem("images", JSON.stringify(images));

// // READ DATA FROM LOCALSTORAGE
// const photosFromLS = JSON.parse(
//   localStorage.getItem("images"),
//   );
// ;
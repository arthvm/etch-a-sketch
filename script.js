window.onload = () => {
  sliderText.textContent = `${sliderValue}x${sliderValue}`;
  UpdateGrid();
};

/***********************************************************GENERIC VARIABLES***********************************************************/
let isSliding = false;
const sliderText = document.querySelector(".grid-size-text");

/***********************************************************GRID VARIABLES***********************************************************/
const grid = document.querySelector(".grid");
const gridWidth = grid.clientWidth;
const gridHeight = grid.clientHeight;

/***********************************************************PIXEL VARIABLES***********************************************************/
const PIXEL_BORDER = 1;
const slider = document.getElementById("grid-slider");
let sliderValue = slider.value;

let pixelWidth = gridWidth / sliderValue - PIXEL_BORDER * 2;
let pixelHeight = gridHeight / sliderValue - PIXEL_BORDER * 2;

/***********************************************************GRID SECTION***********************************************************/
slider.addEventListener("input", () => {
  isSliding = true;
  sliderValue = slider.value;
  sliderText.textContent = `${sliderValue}x${sliderValue}`;
});

if ((isSliding = true)) {
  slider.addEventListener("mouseup", () => {
    isSliding = false;
    UpdatePixel(sliderValue);
    UpdateGrid();
  });
}

function UpdatePixel(slider_value) {
  pixelWidth = gridWidth / slider_value - PIXEL_BORDER * 2;
  pixelHeight = gridHeight / slider_value - PIXEL_BORDER * 2;
}

function UpdateGrid() {
  const pixels = document.querySelectorAll(".pixel");

  for (let i = 0; i < pixels.length; i++) {
    const pixel = pixels[i];
    pixel.remove();
  }

  for (let i = 0; i < sliderValue * sliderValue; i++) {
    const pixel = document.createElement("div");
    pixel.classList.add("pixel");

    pixel.style.cssText = `width: ${pixelWidth}px; height: ${pixelHeight}px`;
    grid.appendChild(pixel);
  }
}

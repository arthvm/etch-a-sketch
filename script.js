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

/***********************************************************SETTINGS VARIABLES***********************************************************/

//****************************COLOR SECTION****************************
const colorPicker = document.querySelector(".color-picker");
let colorPickerValue = document.querySelector(".color-picker").value;
let currentColor = colorPicker.value;

//****************************BUTTONS SECTION****************************
const settingsButtons = document.querySelectorAll(".mode-btn");
let activeRainbow = false,
  activeGrey = false,
  activeEraser = false;

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

  AddColorListeners();
}

/***********************************************************COLOR SECTION***********************************************************/
colorPicker.addEventListener("input", () => {
  if (!activeEraser) {
    UpdateColor();
  }
});

function UpdateColor() {
  colorPickerValue = colorPicker.value;
  currentColor = colorPickerValue;
}

function AddColorListeners() {
  const pixels = document.querySelectorAll(".pixel");
  for (let i = 0; i < pixels.length; i++) {
    const pixel = pixels[i];

    pixel.addEventListener("click", () => {
      pixel.style.cssText += `background-color: ${currentColor}`;
    });
  }
}

/***********************************************************COLOR SECTION***********************************************************/
for (let i = 0; i < settingsButtons.length; i++) {
  const button = settingsButtons[i];

  button.addEventListener("click", (e) => {
    const activeButton = document.querySelector(".active");

    if (activeButton == null) {
      e.target.classList.toggle("active");
    } else if (activeButton != e.target) {
      activeButton.classList.toggle("active");
      e.target.classList.toggle("active");
    } else {
      e.target.classList.toggle("active");
    }

    switch (e.target.id) {
      case "rainbow-btn":
        RainbowButton();
        break;
      case "grey-btn":
        GreyButton();
        break;
      case "eraser-btn":
        EraserButton();
        break;
    }
  });
}

function RainbowButton() {
  activeRainbow = !activeRainbow;
  activeEraser = false;
  activeGrey = false;

  if (activeRainbow) {
  } else {
  }
}

function GreyButton() {
  activeGrey = !activeGrey;
  activeRainbow = false;
  activeEraser = false;

  if (activeGrey) {
  } else {
  }
}

function EraserButton() {
  activeEraser = !activeEraser;
  activeRainbow = false;
  activeGrey = false;

  if (activeEraser) {
    currentColor = "white";
  } else {
    UpdateColor();
  }
}

window.onload = () => {
  sliderText.textContent = `${sliderValue}x${sliderValue}`;
  UpdateGrid();
};

String.prototype.HexToRGB = function (...opacity) {
  let hexCode = this;
  let r = parseInt(hexCode.slice(1, 3), 16);
  let g = parseInt(hexCode.slice(3, 5), 16);
  let b = parseInt(hexCode.slice(5, 7), 16);

  let rgbCode = `rgba(${r},${g},${b},${opacity})`;
  currentRGBAColor = rgbCode;
  return rgbCode;
};

function RandomColor() {
  let randomColor = "#";
  const hexArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

  for (let i = 0; i < 6; i++) {
    randomColor += hexArray[Math.floor(Math.random() * 16)];
  }

  currentColor = randomColor;
}

function OpacityColor(pixel) {
  if (pixel.hasAttribute("data-gray_mode")) {
    const temp = +pixel.dataset.gray_mode;
    pixel.setAttribute("data-gray_mode", temp + 0.1);
    currentColor = currentColor.HexToRGB(temp + 0.1);
  } else {
    pixel.setAttribute("data-gray_mode", 0.1);
    currentColor = currentColor.HexToRGB(0.1);
  }
}

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

let currentRGBAColor;

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
      ChangeColor(pixel);
    });
  }
}

function ChangeColor(pixel_to_color) {
  if (activeRainbow) {
    RandomColor();
    pixel_to_color.style.cssText += `background-color: ${currentColor}`;
  } else if (activeGrey) {
    OpacityColor(pixel_to_color);
    pixel_to_color.style.cssText += `background-color: ${currentColor}`;
    UpdateColor();
  } else {
    pixel_to_color.style.cssText += `background-color: ${currentColor}`;
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

  if (!activeRainbow) {
    UpdateColor();
  }
}

function GreyButton() {
  UpdateColor();
  activeGrey = !activeGrey;
  activeRainbow = false;
  activeEraser = false;
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

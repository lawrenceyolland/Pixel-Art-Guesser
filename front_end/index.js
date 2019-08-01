// write js here
const body = document.querySelector("body");
const spaContainer = document.createElement("spa");
body.append(spaContainer);

const playerChoice = () => {
  const selectorContainer = document.createElement("div");
  selectorContainer.setAttribute("class", "selector-container");

  const gameHeader = document.createElement("h2");
  gameHeader.setAttribute("class", "game-header");
  gameHeader.innerText = "Play a New Game";

  const playerOneHeader = document.createElement("h3");
  playerOneHeader.setAttribute("class", "player-choices drawer");
  playerOneHeader.innerText = "Draw Something";
  playerOneHeader.dataset.on = true;

  const playerTwoHeader = document.createElement("h3");
  playerTwoHeader.setAttribute("class", "player-choices guesser");
  playerTwoHeader.innerText = "Guess Something";
  playerOneHeader.dataset.on = false;

  selectorContainer.append(gameHeader, playerOneHeader, playerTwoHeader);

  spaContainer.append(selectorContainer);

  let direction = true;

  const directionUp = () => (direction = true);
  const directionDown = () => (direction = false);

  const processMenuDirections = e => {
    if (e.code === "Enter") {
      direction === true ? makeArt() : youLost();
    } else if (e.code === "ArrowUp") {
      directionUp();
      playerOneHeader.dataset.on = true;
      playerTwoHeader.dataset.on = false;
    } else if (e.code === "ArrowDown") {
      directionDown();
      playerOneHeader.dataset.on = false;
      playerTwoHeader.dataset.on = true;
    }
  };

  window.addEventListener("keydown", processMenuDirections);
};

playerChoice();

const makeArt = () => {
  const selectorContainer = document.querySelector(".selector-container");
  spaContainer.removeChild(selectorContainer);

  const pixelArtContainer = document.createElement("pixelArtContainer");
  const imageShowcase = document.createElement("imageShowcase");
  imageShowcase.setAttribute("class", "image-showcase");
  spaContainer.append(pixelArtContainer, imageShowcase);

  // Form functions
  const form = document.createElement("form");
  pixelArtContainer.append(form);

  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("class", "inp");
  input.setAttribute("id", "colorPicker");
  input.setAttribute("placeholder", "Choose a color");

  const inputTitle = document.createElement("input");
  inputTitle.setAttribute("type", "text");
  inputTitle.setAttribute("class", "inp");
  inputTitle.setAttribute("id", "art-title");
  inputTitle.setAttribute("placeholder", "drawing title");

  const palette = document.createElement("div");
  palette.setAttribute("class", "palette");
  palette.setAttribute("id", "colorPalette");

  form.append(input, inputTitle, palette);

  const hideColorPalette = () => {
    if (colorPalette.mouseIsOver === false) {
      colorPalette.style.display = "none";
      colorInput.style.borderRight = `10px solid ${colorInput.value}`;
    }
  };

  const componentToHex = c => {
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  };

  const rgbToHex = color => {
    arr = color
      .replace("rgb", "")
      .replace("(", "")
      .replace(")", "")
      .split(",");
    return (
      "#" +
      componentToHex(Number(arr[0])) +
      componentToHex(Number(arr[1])) +
      componentToHex(Number(arr[2]))
    );
  };

  const showColorPalette = () => {
    colorPalette.innerHTML = "";
    colorPalette.style.display = "block";
    const swatches = [
      "#000000",
      "#191919",
      "#323232",
      "#4b4b4b",
      "#646464",
      "#7d7d7d",
      "#969696",
      "#afafaf",
      "#c8c8c8",
      "#e1e1e1",
      "#ffffff",
      "#820000",
      "#9b0000",
      "#b40000",
      "#cd0000",
      "#e60000",
      "#ff0000",
      "#ff1919",
      "#ff3232",
      "#ff4b4b",
      "#ff6464",
      "#ff7d7d",
      "#823400",
      "#9b3e00",
      "#b44800",
      "#cd5200",
      "#e65c00",
      "#ff6600",
      "#ff7519",
      "#ff8532",
      "#ff944b",
      "#ffa364",
      "#ffb27d",
      "#828200",
      "#9b9b00",
      "#b4b400",
      "#cdcd00",
      "#e6e600",
      "#ffff00",
      "#ffff19",
      "#ffff32",
      "#ffff4b",
      "#ffff64",
      "#ffff7d",
      "#003300",
      "#004d00",
      "#008000",
      "#00b300",
      "#00cc00",
      "#00e600",
      "#1aff1a",
      "#4dff4d",
      "#66ff66",
      "#80ff80",
      "#b3ffb3",
      "#001a4d",
      "#002b80",
      "#003cb3",
      "#004de6",
      "#0000ff",
      "#0055ff",
      "#3377ff",
      "#4d88ff",
      "#6699ff",
      "#80b3ff",
      "#b3d1ff",
      "#003333",
      "#004d4d",
      "#006666",
      "#009999",
      "#00cccc",
      "#00ffff",
      "#1affff",
      "#33ffff",
      "#4dffff",
      "#80ffff",
      "#b3ffff",
      "#4d004d",
      "#602060",
      "#660066",
      "#993399",
      "#ac39ac",
      "#bf40bf",
      "#c653c6",
      "#cc66cc",
      "#d279d2",
      "#d98cd9",
      "#df9fdf",
      "#660029",
      "#800033",
      "#b30047",
      "#cc0052",
      "#e6005c",
      "#ff0066",
      "#ff1a75",
      "#ff3385",
      "#ff4d94",
      "#ff66a3",
      "#ff99c2"
    ];
    swatches.forEach(color => {
      let div = document.createElement("div");
      div.setAttribute("class", "color-option");
      div.setAttribute("style", `background-color: ${color}`);
      colorPalette.append(div);
    });
    const colorOption = document.querySelectorAll(".color-option");
    colorOption.forEach(o => o.addEventListener("click", chooseColor));
  };

  const chooseColor = e => {
    let color = rgbToHex(e.target.style.backgroundColor);
    colorInput.value = color;
    colorInput.style.borderRight = `10px solid ${color}`;
    colorPalette.style.display = "none";
  };

  let colorInput = document.getElementById("colorPicker");
  let colorPalette = document.getElementById("colorPalette");

  colorInput.addEventListener("click", showColorPalette);
  colorInput.addEventListener("focusout", hideColorPalette);
  colorPalette.mouseIsOver = false;
  colorInput.style.borderRight = `10px solid ${colorInput.value}`;

  colorPalette.onmouseover = () => (colorPalette.mouseIsOver = true);
  colorPalette.onmouseout = () => (colorPalette.mouseIsOver = false);

  const saveButton = document.createElement("button");
  saveButton.setAttribute("class", "save-button");
  saveButton.innerText = "Save Image";
  pixelArtContainer.append(saveButton);

  const postImage = postData => {
    const baseUrlArts = "http://localhost:3000//api/v1/arts";
    fetch(baseUrlArts, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });
  };
  const saveImage = () => {
    html2canvas(table, {
      onrendered: canvas => {
        const postData = {
          art: {
            title: inputTitle.value,
            img_url: canvas.toDataURL()
          }
        };
        postImage(postData);
      }
    });
  };

  saveButton.addEventListener("click", saveImage);

  const hoverActiveColor = e => {
    e.target.style.boxShadow =
      !colorInput.value === true ? "" : `inset 0 0 20px ${colorInput.value}`;
    table.style.cursor =
      !colorInput.value === true ? "not-allowed" : "crosshair";
  };

  const hoverInactiveColor = e => (e.target.style.boxShadow = "");

  const changeColor = e => (e.target.style.backgroundColor = colorInput.value);

  const addRemoveColor = e => {
    if (e.target.style.backgroundColor === "") {
      e.target.style.backgroundColor = colorInput.value;
    } else {
      e.target.style.backgroundColor = "";
    }
  };

  const paint = e => {
    e.preventDefault();
    if (trigger === true) changeColor(e);
  };

  // Table functions
  const table = document.createElement("table");
  table.setAttribute("id", "capture");
  pixelArtContainer.append(table);

  for (let i = 0; i < 16; i++) {
    let row = document.createElement("tr");
    row.setAttribute("class", `row-${i}`);
    for (let j = 0; j < 16; j++) {
      let cell = document.createElement("td");
      cell.setAttribute("class", `panel-element-${j}`);
      row.append(cell);
    }
    table.append(row);
  }

  const cells = document.querySelectorAll("td");

  let trigger = false;

  const triggerFalse = () => (trigger = false);
  const triggerTrue = () => (trigger = true);

  // const withClick = listen("click")...etc
  const withEvent = eventType => listener => element => {
    element.addEventListener(eventType, listener);
  };

  // event types
  const withMouseClick = withEvent("click");
  const withMouseDown = withEvent("mousedown");
  const withMouseUp = withEvent("mouseup");
  const withMouseOver = withEvent("mouseover");
  const withMouseEnter = withEvent("mouseenter");
  const withMouseLeave = withEvent("mouseleave");

  // listeners
  const withMouseClickAddRemoveColor = withMouseClick(addRemoveColor);
  const withMouseDownTriggerTrue = withMouseDown(triggerTrue);
  const withMouseUpTriggerFalse = withMouseUp(triggerFalse);
  const withMouseOverPaint = withMouseOver(paint);
  const withMouseEnterActiveColor = withMouseEnter(hoverActiveColor);
  const withMouseLeaveInactiveColor = withMouseLeave(hoverInactiveColor);

  // reset when pointer leaves the table
  table.addEventListener("mouseleave", triggerFalse);

  cells.forEach(td => {
    // and and remove pixel background color
    withMouseClickAddRemoveColor(td);
    // mousedown and mouseover allow for draggable draw behaviour. Mouseup disables this.
    withMouseDownTriggerTrue(td);
    withMouseUpTriggerFalse(td);
    withMouseOverPaint(td);
    withMouseEnterActiveColor(td);
    withMouseLeaveInactiveColor(td);
  });
};

// const playerOneHeader = document.querySelector(".drawer");
// playerOneHeader.addEventListener("click", makeArt);

// const youWin = () => {
//   const im = "https://media.giphy.com/media/3o7aD4pR1HbHJFTBF6/giphy.gif";
//   body.style.backgroundImage = `url(${im})`;
//   body.style.backgroundRepeat = "no-repeat";
//   body.style.backgroundSize = "cover";
//   spaContainer.removeChild(document.querySelector(".selector-container"));
// };

const youLost = () => {
  const im = "https://media.giphy.com/media/3o7aD4pR1HbHJFTBF6/giphy.gif";
  body.style.backgroundImage = `url(${im})`;
  body.style.backgroundRepeat = "no-repeat";
  body.style.backgroundSize = "cover";

  spaContainer.removeChild(document.querySelector(".selector-container"));
};
// playerOneButton.addEventListener("click", makeArt);


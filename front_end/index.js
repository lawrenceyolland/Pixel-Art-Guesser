const body = document.querySelector("body");
const spaContainer = document.createElement("spa");
body.append(spaContainer);

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

const showScoreboard = () => {
  console.log("the event listener worked");
  const baseUrlGames = "http://localhost:3000//api/v1/games";
  const baseUrlUsers = "http://localhost:3000//api/v1/users";

  const fetchScoreBoards = () => {
    return fetch(baseUrlGames).then(resp => resp.json());
  };

  const sortDataRanking = () => {
    return fetchScoreBoards().then(games => {
      const sorted_games = games.data.sort(function(a, b) {
        return a.attributes.score - b.attributes.score;
      });
      const users = games.included;
      return [sorted_games.reverse().slice(0, 11), users];
    });
  };

  const createLeaderBoards = () => {
    sortDataRanking().then(appendBodyWithLeaderBoards);
  };

  const appendBodyWithLeaderBoards = ranking => {
    const games = ranking[0];
    const players = ranking[1];
    spaContainer.innerHTML = "";
    const boardDiv = document.createElement("div");
    boardDiv.className = "leaderboard";

    const boardUl = document.createElement("ul");
    boardUl.className = "boardul";
    games.forEach(game => {
      players;
      const player_id = game.relationships.user.data.id;
      const player_name = players.find(user => user.id === player_id).attributes
        .name;
      const boardLi = document.createElement("li");
      boardLi.dataset.game_id = game.id;
      boardLi.innerText = `Player: ${player_name}, Score ${
        game.attributes.score
      }!`;

      boardUl.appendChild(boardLi);
    });

    boardDiv.appendChild(boardUl);
    selectedBody.appendChild(boardDiv);
  };
};

const guessImage = () => {
  spaContainer.innerHTML = "";
  spaContainer.innerHTML = `
  <div class="image-container">
  <img src="http://lorempixel.com/200/300" />
  <div class="after"></div>
</div>
`;

  const overlay = document.querySelector(".after");
  let height = 100;

  const runReveal = () => {
    overlay.style.height = `${height}%`;
    t = setTimeout(() => {
      if (height != 0) {
        height -= 5;
        runReveal();
        console.log(height);
      }
    }, 2000);
  };

  const button = document.createElement("button");
  button.innerText = "reveal";

  button.addEventListener("click", runReveal);

  spaContainer.append(button);
};

const history = () => {
  const baseUrlArts = "http://localhost:3000//api/v1/arts";
  const per_page = n => `/?per_page=9&page=${n}`;
  const headTitle = document.querySelector("#head-title");
  headTitle.dataset.history_page = 1;
  let historyPage = parseInt(headTitle.dataset.history_page);

  const fetchArtData = (n = 1) => {
    return fetch(baseUrlArts + per_page(n)).then(resp => resp.json());
  };

  const showHistoryGames = (page = 1) => {
    fetchArtData(page).then(arts => {
      appendHistoryPage(arts);
    });
  };

  const nextHistoryPage = () => {
    const art_number = document.querySelector(".history_main_div").dataset
      .art_number;
    if (!(art_number < 9)) {
      historyPage += 1;
      showHistoryGames(historyPage);
    } else {
      alert("No More Art. Sorry :(");
    }
  };

  const previousHistoryPage = () => {
    const art_number = document.querySelector(".history_main_div").dataset
      .art_number;
    if (historyPage > 1) {
      historyPage -= 1;
      showHistoryGames(historyPage);
    } else {
      alert("This is first page!");
    }
  };

  const appendHistoryPage = arts => {
    spaContainer.innerHTML = "";

    const historyDiv = document.createElement("div");
    historyDiv.setAttribute("class", "history_main_div");
    historyDiv.dataset.art_number = arts.data.length;

    const previousButton = document.createElement("button");
    previousButton.setAttribute("class", "history-button previous");
    previousButton.innerText = "Previous";
    // previous button should be disable by default
    // previousButton.setAttribute("disabled", true)

    previousButton.addEventListener("click", event =>
      previousHistoryPage(event)
    );

    const nextButton = document.createElement("button");
    nextButton.setAttribute("class", "history-button next");
    nextButton.innerText = "Next";

    nextButton.addEventListener("click", event => nextHistoryPage(event));

    const pageArts = document.createElement("p");
    pageArts.innerText = `This Page Art #: ${arts.data.length}`;

    historyDiv.append(previousButton, nextButton, pageArts);

    spaContainer.appendChild(historyDiv);

    arts.data.forEach(art => {
      const eachArtDivElem = document.createElement("div");
      eachArtDivElem.setAttribute("class", "art_div");
      eachArtDivElem.dataset.id = art.id;

      const eachArtImg = document.createElement("img");
      eachArtImg.setAttribute("src", art.attributes.img_url);
      eachArtImg.setAttribute("class", "img pixel-drawing");

      const eachPArtElem = document.createElement("p");
      eachPArtElem.innerText = art.attributes.title;
      eachArtDivElem.append(eachArtImg, eachPArtElem);

      historyDiv.appendChild(eachArtDivElem);
    });
  };

  showHistoryGames();
};

const playerChoice = () => {
  spaContainer.innerHTML = "";

  const selectorContainer = document.createElement("div");
  selectorContainer.setAttribute("class", "selector-container");

  const gameHeader = document.createElement("h2");
  gameHeader.setAttribute("class", "game-header");
  gameHeader.innerText = "Play a New Game";

  const playerOneHeader = document.createElement("h3");
  playerOneHeader.setAttribute("class", "player-choices drawer");
  playerOneHeader.innerText = "Draw Something";
  playerOneHeader.dataset.on = false;

  const playerTwoHeader = document.createElement("h3");
  playerTwoHeader.setAttribute("class", "player-choices guesser");
  playerTwoHeader.innerText = "Guess Something";
  playerOneHeader.dataset.on = false;

  const artHistory = document.createElement("h3");
  artHistory.setAttribute("class", "player-choices history");
  artHistory.innerText = "Artwork";
  artHistory.dataset.on = false;

  const scoreboard = document.createElement("h3");
  scoreboard.setAttribute("class", "player-choices scoreboard");
  scoreboard.innerText = "Scoreboard";
  scoreboard.dataset.on = false;

  selectorContainer.append(
    gameHeader,
    playerOneHeader,
    playerTwoHeader,
    artHistory,
    scoreboard
  );

  spaContainer.append(selectorContainer);

  let currentSelection = 0;
  const processMenuDirectionsNumbers = e => {
    if (e.code === "Enter") {
      window.removeEventListener("keydown", processMenuDirectionsNumbers);
      switch (currentSelection) {
        case 1:
          makeArt();
          break;
        case 2:
          guessImage();
          break;
        case 3:
          history();
          break;
        case 4:
          showScoreboard();
          break;
      }
    } else if (e.code === "Digit1") {
      currentSelection = 1;
      playerOneHeader.dataset.on = true;
      playerTwoHeader.dataset.on = false;
      artHistory.dataset.on = false;
      scoreboard.dataset.on = false;
    } else if (e.code === "Digit2") {
      currentSelection = 2;
      playerTwoHeader.dataset.on = true;
      playerOneHeader.dataset.on = false;
      artHistory.dataset.on = false;
      scoreboard.dataset.on = false;
    } else if (e.code === "Digit3") {
      currentSelection = 3;
      artHistory.dataset.on = true;
      playerOneHeader.dataset.on = false;
      playerTwoHeader.dataset.on = false;
      scoreboard.dataset.on = false;
    } else if (e.code === "Digit4") {
      currentSelection = 4;
      scoreboard.dataset.on = true;
      artHistory.dataset.on = false;
      playerOneHeader.dataset.on = false;
      playerTwoHeader.dataset.on = false;
    }
  };

  const processMenuDirectionsEnter = e => {
    e.target.dataset.on = true;
  };

  const processMenuDirectionsLeave = e => {
    e.target.dataset.on = false;
  };

  const clickThrough = e => {
    window.addEventListener("keydown", processMenuDirectionsNumbers);
    switch (e.target.innerText) {
      case "Draw Something":
        makeArt();
        break;
      case "Guess Something":
        guessImage();
        break;
      case "Artwork":
        history();
        break;
      case "Scoreboard":
        showScoreboard();
        break;
    }
  };

  window.addEventListener("keydown", processMenuDirectionsNumbers);

  // listeners
  const withClickAndProceed = withMouseClick(clickThrough);
  const withMouseOverAndProceed = withMouseOver(processMenuDirectionsEnter);
  const withMouseLeaveProceed = withMouseLeave(processMenuDirectionsLeave);

  withClickAndProceed(gameHeader);
  withMouseOverAndProceed(gameHeader);
  withMouseLeaveProceed(gameHeader);

  withClickAndProceed(playerOneHeader);
  withMouseOverAndProceed(playerOneHeader);
  withMouseLeaveProceed(playerOneHeader);

  withClickAndProceed(playerTwoHeader);
  withMouseOverAndProceed(playerTwoHeader);
  withMouseLeaveProceed(playerTwoHeader);

  withClickAndProceed(artHistory);
  withMouseOverAndProceed(artHistory);
  withMouseLeaveProceed(artHistory);

  withClickAndProceed(scoreboard);
  withMouseOverAndProceed(scoreboard);
  withMouseLeaveProceed(scoreboard);
};

const makeArt = () => {
  // const selectorContainer = document.querySelector(".selector-container");
  // if (selectorContainer) spaContainer.removeChild(selectorContainer);
  spaContainer.innerHTML = "";
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

  const saveRedrawButton = document.createElement("button");
  saveRedrawButton.setAttribute("class", "save-redraw-button");
  saveRedrawButton.innerText = "Save Image";

  pixelArtContainer.append(saveRedrawButton);

  const drawAnother = document.createElement("button");
  drawAnother.innerText = "Draw Another";

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
    saveRedrawButton.removeEventListener("click", saveImage);
    saveRedrawButton.innerText = "Draw Another";
    saveRedrawButton.addEventListener("click", makeArt);
  };

  saveRedrawButton.addEventListener("click", saveImage);

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

  const backToMenu = document.createElement("button");
  backToMenu.setAttribute("class", "back-to-menu");
  backToMenu.innerText = "Back to Menu";

  backToMenu.addEventListener("click", playerChoice);

  pixelArtContainer.append(table, backToMenu);

  for (let i = 0; i < 16; i++) {
    let row = document.createElement("tr");
    row.setAttribute("class", `row-${i}`);
    for (let j = 0; j < 16; j++) {
      let cell = document.createElement("td");
      cell.setAttribute("class", `panel-element-${j}`);
      cell.setAttribute("draggable", false);
      row.append(cell);
    }
    table.append(row);
  }

  const cells = document.querySelectorAll("td");

  let trigger = false;

  const triggerFalse = () => (trigger = false);
  const triggerTrue = () => (trigger = true);

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

const youLost = () => {
  const im = "https://media.giphy.com/media/3o7aD4pR1HbHJFTBF6/giphy.gif";
  body.style.backgroundImage = `url(${im})`;
  body.style.backgroundRepeat = "no-repeat";
  body.style.backgroundSize = "cover";

  spaContainer.removeChild(document.querySelector(".selector-container"));
};

playerChoice();

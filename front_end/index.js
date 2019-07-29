// write js here

document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");
  for (let k = 0; k < 2; k++) {
    let panel = document.createElement("panel");
    body.append(panel);
    for (let i = 0; i < 16; i++) {
      let panelRow = document.createElement("panelRow");
      panelRow.className = `panel-row-${i}`;
      for (let j = 0; j < 8; j++) {
        let cell = document.createElement("cell");
        cell.className = `panel-element-${j}`;
        if (j % 2 === 0) {
          cell.id = "white_square";
        } else {
          cell.id = "black_square";
        }
        panelRow.append(cell);
      }
      panel.append(panelRow)
    }
  }
});

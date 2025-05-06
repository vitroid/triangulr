// Webカラー（256色）を生成する関数
function generateWebColors() {
  const colors = [];
  const steps = [0, 51, 102, 153, 204, 255];

  for (let r of steps) {
    for (let g of steps) {
      for (let b of steps) {
        const hex = `#${r.toString(16).padStart(2, "0")}${g
          .toString(16)
          .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
        colors.push(hex);
      }
    }
  }

  return colors;
}

export const defaultPalette = generateWebColors();

export class PaletteService {
  constructor() {
    this.colors = [...defaultPalette];
    this.onColorSelect = null;
  }

  init(container) {
    // パレットの初期化処理
    this.container = container;
    this.render();
  }

  render() {
    // パレットの描画処理
    if (!this.container) return;

    this.container.innerHTML = "";
    this.colors.forEach((color) => {
      const colorElement = document.createElement("div");
      colorElement.style.backgroundColor = color;
      colorElement.style.width = "20px";
      colorElement.style.height = "20px";
      colorElement.style.margin = "2px";
      colorElement.style.display = "inline-block";
      colorElement.style.cursor = "pointer";
      colorElement.style.border = "1px solid #ccc";
      colorElement.addEventListener("click", () => {
        if (this.onColorSelect) {
          this.onColorSelect(color);
        }
      });
      this.container.appendChild(colorElement);
    });
  }

  setColorSelectCallback(callback) {
    this.onColorSelect = callback;
  }

  addColor(color) {
    if (!this.colors.includes(color)) {
      this.colors.push(color);
      this.render();
    }
  }

  removeColor(color) {
    const index = this.colors.indexOf(color);
    if (index > -1) {
      this.colors.splice(index, 1);
      this.render();
    }
  }

  getColors() {
    return [...this.colors];
  }

  setColors(colors) {
    this.colors = [...colors];
    this.render();
  }
}

import * as THREE from "three";
import BasePasta from "./basePasta.js"

// Rigatoni (a.k.a. Nicholas Montaño "Tony Rigatoni")
class Rigatoni extends BasePasta {
  constructor() {
    super();
    const positions = [];
    const colors = [];

    let index = 0;
    const indexArray = [];
    let vertex = new THREE.Vector3();

    const i_max = 240;
    const j_max = 60;

    for (let i = 0; i <= i_max; i++) {
      const indexRow = [];
      for (let j = 0; j <= j_max; j++) {
        const r = i / i_max;
        const g = 0.5;
        const b = j / j_max;

        vertex.x = 0.2 * Math.sin(((7 * i + 15) / 30) * Math.PI) + 2 * Math.cos(((j + 60) / 120) * Math.PI) + Math.cos((i / 120) * Math.PI) * (7 + ((60 - j) / 60) * Math.sin(i / 240) * Math.PI);
        vertex.y = 0.2 * Math.sin(7 * i / 30 * Math.PI) + Math.sin(i/120 * Math.PI) *
          (8 + 0.1 * (60-j)/60 + j/30 * Math.cos(i/240 * Math.PI))
        vertex.z = j/2;

        positions.push(vertex.x, vertex.y, vertex.z);
        colors.push(r, g, b);
        indexRow.push(index++);
      }
      indexArray.push(indexRow);
    }

    this.setAttribute("position",
      new THREE.Float32BufferAttribute(positions, 3));
    this.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    this.computeSurface(positions, indexArray, i_max, j_max);

    return this;
  }
}

export default Rigatoni;

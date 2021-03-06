import * as THREE from "three";
import BasePasta from "./basePasta.js"

// Gnocchi (a.k.a. Hannah Wolff "Sleepy Potato Pillow")
class Gnocchi extends BasePasta {
  constructor() {
    super();
    const positions = [];
    const colors = [];

    let index = 0;
    const indexArray = [];
    let vertex = new THREE.Vector3();

    const i_max = 40;
    const j_max = 130;

    for (let i = 0; i <= i_max; i++) {
      const indexRow = [];
      for (let j = 0; j <= j_max; j++) {
        const r = i / i_max;
        const g = 0.5;
        const b = j / j_max;

        let k_1 = i/40 * Math.sin(j/130 * Math.PI)
        let k_2 = Math.abs(Math.cos((j+13)/26 * Math.PI));

        vertex.x = 1.5 * Math.cos(j/130 * Math.PI);
        vertex.y = 0.2 * Math.cos(i/40 * 1.3 * Math.PI) *
          Math.sin(j/130 * Math.PI) * k_2 +
          k_1 * Math.cos(i/40 * 1.3 * Math.PI);
        vertex.z = 0.2 * Math.sin(i/40 * 1.3 * Math.PI) *
          Math.sin(j/130 * Math.PI) * k_2 +
          k_1 * Math.sin(i/40 * 1.3 * Math.PI);

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
  }
}

export default Gnocchi;

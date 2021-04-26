import * as THREE from "three";
import BasePasta from "./basePasta.js"

// Farfalle (a.k.a. Linna Li "Reminds me of my cat")
class Farfalle extends BasePasta {

  constructor() {
    super();

    const positions = [];
    const colors = [];

    let index = 0;
    const indexArray = [];
    let vertex = new THREE.Vector3();

    const i_max = 80;
    const j_max = 80;

    for (let i = 0; i <= i_max; i++) {
      const indexRow = [];
      for (let j = 0; j <= j_max; j++) {
        const r = i / i_max;
        const g = 0.5;
        const b = j / j_max;

        let k_1 = Math.sin(((7*i+16) / 40)*Math.PI)
        let k_2 = (7*j/16) + 4 * Math.sin(i/80*Math.PI) * Math.sin((j-10)/120*Math.PI);
        let k_3 = 10*Math.cos((i+80)/80 *Math.PI)*Math.pow(Math.sin((j+110)/100 * Math.PI), 9);
        let k_4 = ((7*j)/16) - 4 * Math.sin(i/80*Math.PI) - k_1* Math.sin((10-j)/20*Math.PI);
        let k_5 = ((7*j)/16) + 4 * Math.sin(i/80*Math.PI) + k_1* Math.sin((10-j)/20*Math.PI);

        if (j >= 10 && j<= 70) {
          vertex.x = k_2 - 4 * Math.sin(i/80 * Math.PI) * Math.sin((70-j)/120 * Math.PI);
        } else if (j <= 10) {
          vertex.x = k_4;
        } else {
          vertex.x = k_5;
        }
        vertex.y = 3 * Math.sin((i+10)/20 * Math.PI) * Math.pow(Math.sin(j/80 * Math.PI), 1.5);
        vertex.z = 3 * i / 8;
        if (i >= 20 && i <= 60) {
          vertex.z += 7 * Math.pow(Math.sin((i+40)/40 * Math.PI), 3) *
          Math.pow(Math.sin((j+110)/100 * Math.PI), 9);
        } else {
          vertex.z += k_3;
        }

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

export default Farfalle;

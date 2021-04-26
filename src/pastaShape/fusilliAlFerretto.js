import * as THREE from "three";
import BasePasta from "./basePasta.js"

// FusilliAlFerretto (a.k.a. Sean Chen "this speaks to me" )
class FusilliAlFerretto extends BasePasta {
  constructor() {
    super();
    const positions = [];
    const colors = [];

    let index = 0;
    const indexArray = [];
    let vertex = new THREE.Vector3();

    let i_max = 140;
    let j_max = 40;

    let r, g, b;
    for (let i = 0; i <= i_max; i++) {
      const indexRow = [];
      for (let j = 0; j <= j_max; j++) {
        r = i / i_max;
        g = 0.5;
        b = j / j_max;

        let alpha = 6 * i/7 + 15 * Math.cos(j/20 * Math.PI);
        vertex.x = (3 + 1.5 * Math.pow(Math.sin(i/140 * Math.PI), 0.5) * Math.sin(j/20 * Math.PI)) *
                    Math.sin(13 * i / 280 * Math.PI) + 5 * Math.sin(2 * alpha / 135 * Math.PI)
        vertex.y = (3 + 1.5 * Math.pow(Math.sin(i/140 * Math.PI), 0.5) * Math.sin(j/20 * Math.PI)) * Math.cos(13 * i / 280 * Math.PI);
        vertex.z = alpha;

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

export default FusilliAlFerretto;

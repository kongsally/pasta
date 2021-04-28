import * as THREE from "three";
import BasePasta from "./basePasta.js"

// Fusilli Lunghi Bucati (a.k.a. Aaryan Porwal "I like how it looks like a necklace")
class FusilliLunghiBucati extends BasePasta {
  constructor() {
    super();
    const positions = [];
    const colors = [];
    const indices = [];
    let normals = [];

    let index = 0;
    const indexArray = [];
    let vertex = new THREE.Vector3();

    let i_max = 20;
    let j_max = 200;

    let r, g, b;
    for (let i = 0; i <= i_max; i++) {
      const indexRow = [];
      for (let j = 0; j <= j_max; j++) {
        r = i / i_max;
        g = 0.5;
        b = j / j_max;

        let k_0 = 10 + Math.cos(i/10 * Math.PI) + 2 * Math.cos((j+10)/10 * Math.PI) +
                  10*Math.cos((j+140)/160 * Math.PI);
        let k_1 = 20 + Math.cos(i/10 * Math.PI) + 2 * Math.cos((j+10)/10 * Math.PI);
        let k_2 = (j+10)/10 * Math.PI;
        let k_3 = i/10 * Math.PI;
        let k_4 = 7 + 20 * Math.sin((j-20)/160 * Math.PI);
        let k_5 = 70 * (0.1 - (j-180)/200);

        if(j>=20 && j<=180){
          vertex.x = k_0;
          vertex.y = Math.sin(k_3) + 2 * Math.sin(k_2);
          vertex.z = k_4;
        } else if (j<=20) {
          vertex.x = Math.cos(k_3) + 2 * Math.cos(k_2);
          vertex.y = Math.sin(k_3) + 2 * Math.sin(k_2);
          vertex.z = 7 * j / 20;
        } else {
          vertex.x = k_1;
          vertex.z = k_5;
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

export default FusilliLunghiBucati;

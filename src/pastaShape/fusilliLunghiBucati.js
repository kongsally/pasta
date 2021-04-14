import * as THREE from "three";

// Fusilli Lunghi Bucati (a.k.a. Aaryan Porwal "I like how it looks like a necklace")
function FusilliLunghiBucati() {
  const positions = [];
  const colors = [];
  const indices = [];

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

      // aaryan
      if(j>=20 && j<=180){
        vertex.x = k_0;
        vertex.y = Math.sin(k_3) + 2 * Math.sin(k_2);
        vertex.z = k_4;
      } else if (j<=20) {
        vertex.x = Math.cos(k_3) + 2 * Math.cos(k_2);
        vertex.z = 7 * j / 20;
      } else {
        vertex.x = k_1;
        vertex.y = Math.sin(k_3) + 2 * Math.sin(k_2);
        vertex.z = k_5;
      }

      positions.push(vertex.x, vertex.y, vertex.z);
      colors.push(r, g, b);
      indexRow.push(index++);
    }
    indexArray.push(indexRow);
  }

  for (let i = 0; i < i_max; i++) {
    for (let j = 0; j < j_max; j++) {
      // we use the index array to access the correct indices
      const a = indexArray[i][j];
      const b = indexArray[i + 1][j];
      const c = indexArray[i + 1][j + 1];
      const d = indexArray[i][j + 1];
      // faces
      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  let geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  return geometry;
}

export default FusilliLunghiBucati;

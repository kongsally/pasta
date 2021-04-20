import * as THREE from "three";

// Farfalle (a.k.a. Linna Li "Reminds me of my cat")
function Farfalle() {
  const positions = [];
  const colors = [];
  const indices = [];
  const normals = [];

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

      vertex.z = 3 * i / 8;
      if (i >= 20 && i <= 60) {
        vertex.z += 7 * Math.pow(Math.sin((i+40)/40 * Math.PI), 3) *
        Math.pow(Math.sin((j+110)/100 * Math.PI), 9);
      } else {
        vertex.z += k_3;
      }

      vertex.y = 3 * Math.sin((i+10)/20 * Math.PI) * Math.pow(Math.sin(j/80 * Math.PI), 1.5);

      if (j >= 10 && j<= 70) {
        vertex.x = k_2 - 4 * Math.sin(i/80 * Math.PI) * Math.sin((70-j)/120 * Math.PI);
      } else if (j <= 10) {
        vertex.x = k_4;
      } else {
        vertex.x = k_5;
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
      //normal
      let normal = new THREE.Vector3();
      normal.crossVectors( new THREE.Vector3(
        positions[3*d]-positions[3*b],
        positions[3*d+1]-positions[3*b+1],
        positions[3*d+2]-positions[3*b+2]),
                           new THREE.Vector3(
       positions[3*b]-positions[3*a],
       positions[3*b+1]-positions[3*a+1],
       positions[3*b+2]-positions[3*a+2]
       ))
       normal.normalize();
       normals.push(normal.x, normal.y, normal.z);
    }
  }

  let geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  geometry.setAttribute("normal", new THREE.Float32BufferAttribute( normals, 3 ) );
  geometry.setIndex(indices);

  return geometry;
}

export default Farfalle;

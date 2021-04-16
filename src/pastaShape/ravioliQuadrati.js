import * as THREE from "three";

// Ravioli Quadrati (a.k.a. Janet Kingori "Squishy")
function RavioliQuadrati() {
  const positions = [];
  const colors = [];
  const indices = [];
  let normals = [];

  let index = 0;
  const indexArray = [];
  let vertex = new THREE.Vector3();

  const i_max = 100;
  const j_max = 100;

  for (let i = 0; i <= i_max; i++) {
    const indexRow = [];
    for (let j = 0; j <= j_max; j++) {
      const r = i / i_max;
      const g = 0.5;
      const b = j / j_max;

      vertex.x =
        i / 2 +
        0.4 *
          Math.sin(((j + 2.5) / 5) * Math.PI) *
          (Math.pow(Math.sin((i / 200) * Math.PI), 0.2) -
            Math.pow(Math.cos((i / 200) * Math.PI), 0.2));
      vertex.z =
        j / 2 +
        0.4 *
          Math.sin(((11 * i + 25) / 50) * Math.PI) *
          (Math.pow(Math.sin((j / 200) * Math.PI), 0.2) -
            Math.pow(Math.cos((j / 200) * Math.PI), 0.2));

      if (j > 10 && j < 90 && i > 10 && i < 90) {
        vertex.y =
          10 *
          Math.pow(Math.sin(((i - 10) / 80) * Math.PI), 0.6) *
          Math.pow(Math.sin(((j - 10) / 80) * Math.PI), 0.6);
      } else if (j < 10 || i < 10) {
        vertex.y = 0;
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
  geometry.setAttribute( 'normal', new THREE.Float32BufferAttribute( normals, 3 ) );
  geometry.setIndex(indices);
  return geometry;
}

export default RavioliQuadrati;

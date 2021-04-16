import * as THREE from "three";

// Radiatori (a.k.a. Evan Schwartz "All about that thicc sauce")
function Radiatori() {
  const positions = [];
  const colors = [];
  const indices = [];
  let normals = [];

  let index = 0;
  const indexArray = [];
  let vertex = new THREE.Vector3();

  const i_max = 70;
  const j_max = 1000;

  for (let i = 0; i <= i_max; i++) {
    const indexRow = [];
    for (let j = 0; j <= j_max; j++) {
      const r = i / i_max;
      const g = 0.5;
      const b = j / j_max;

      vertex.x = (1.5 + 3 * Math.pow((i/70), 5) + 4 * Math.pow(Math.sin(j/200 * Math.PI),50)) * Math.cos(4*i/175 * Math.PI);
      vertex.y = (1.5 + 3 * Math.pow((i/70), 5) + 4 * Math.pow(Math.sin(j/200 * Math.PI),50)) * Math.sin(4*i/175 * Math.PI);
      vertex.z = j/50 + Math.cos(3*i/14*Math.PI) * Math.sin(j/1000 * Math.PI);

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

export default Radiatori;

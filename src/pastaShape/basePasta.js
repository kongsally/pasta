import * as THREE from "three";

class BasePasta extends THREE.BufferGeometry {

  constructor() {
    super();
  };

  computeSurface(positions, indexArray, i_max, j_max) {
    const normals = [];
    const indices = [];
    for (let i = 0; i < i_max; i++) {
      for (let j = 0; j < j_max; j++) {
        // we use the index array to access the correct indices
        const a = indexArray[i][j];
        const b = indexArray[i + 1][j];
        const c = indexArray[i + 1][j + 1];
        const d = indexArray[i][j + 1];
        // faces
        indices.push(d, b, a);
        indices.push(d, c, b);
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
      this.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
      this.setIndex(indices);
      return this;
  };
};

export default BasePasta;

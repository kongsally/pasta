import * as THREE from "three";

class BasePasta extends THREE.BufferGeometry {

  constructor() {
    super();
  };

  computeSurface(positions, indexArray, i_max, j_max) {
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
      }
    }
    this.setIndex(indices);
    this.computeVertexNormals();
    return this;
  };
};

export default BasePasta;

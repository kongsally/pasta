import * as THREE from 'three'

// Taglierini (The Sophie Shears pasta of choice from Broders in Minneapolis)
function Taglierini() {
    const positions = []
    const colors = []
    const indices = []
    let normals = [];

    let index = 0;
    const indexArray = [];
    const vertex = new THREE.Vector3();

    let r,g,b
    for (let i = 0; i <= 1000; i++) {
        const indexRow = [];
        for (let j = 0; j <= 2; j++) {
            r = i/1000.0
            g = 0.5
            b = j / 2.0

            vertex.x = 0.5 * Math.cos(i / 100 * Math.PI) + 0.05 * Math.cos(i / 40 * Math.PI)
            vertex.y = 0.5 * Math.sin(i / 4000 * Math.PI) ** 0.1 * Math.sin(i / 100 * Math.PI) + 0.075 * Math.sin(i/40 * Math.PI)
            vertex.z = 3 * j / 200 + 0.1 * Math.sin(i / 125 * Math.PI)
            positions.push(vertex.x, vertex.y, vertex.z)
            colors.push(r,g,b)
            indexRow.push(index ++)

        }
        indexArray.push(indexRow);
    }

    for ( let y = 0; y < 1000; y ++ ) {
		    for ( let x = 0; x < 2; x ++ ) {
				// we use the index array to access the correct indices
				const a = indexArray[ y ][ x ];
				const b = indexArray[ y + 1 ][ x ];
				const c = indexArray[ y + 1 ][ x + 1 ];
				const d = indexArray[ y ][ x + 1 ];
				// faces
				indices.push( a, b, d );
				indices.push( b, c, d );
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

    let geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    geometry.setAttribute( 'normal', new THREE.Float32BufferAttribute( normals, 3 ) );
    geometry.setIndex(indices)
    return geometry
}

export default Taglierini;

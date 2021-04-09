import * as THREE from 'three'

// Penne Rigate (a.k.a. Mark Dawson, the simple yet practical man)
function PenneRigate(scene) {
    const positions = []
    const colors = new Float32Array(70 * 150 * 3)
    const indices = []

    let index = 0;
    let index_cnt = 0;
    const indexArray = [];
    const vertex = new THREE.Vector3();

    for (let i = 0; i <= 170; i++) {
        const indexRow = [];
        for (let j = 0; j <= 40; j++) {
            if (i < 85) {
                vertex.x = 4 * Math.pow(Math.sin(i / 85.0 * Math.PI), 2) + 0.1 * Math.sin(6.0 * i / 17 * Math.PI)
                vertex.y = 4 * Math.cos(i / 85.0 * Math.PI) + 0.1 * Math.cos(6.0 * i / 17.0 * Math.PI)
                vertex.z = 7 * Math.cos(i / 85.0 * Math.PI) + 15 * Math.sin((j - 20.0) / 40.0 * Math.PI)
            } else {
                vertex.x = -4 * Math.pow(Math.sin((i - 85 / 85) / Math.PI), 2) + 0.1 * Math.sin(((6 * (i - 85)) / 17) * Math.PI)
                vertex.y = -4 * Math.cos((i - 85 / 85) / Math.PI) + 0.1 * Math.cos(((6 * (i - 85)) / 17) * Math.PI)
                vertex.z = -7 * Math.cos((i - 85 / 85) / Math.PI) + 15 * Math.sin(((j - 20) / 40) * Math.PI)
            }
            positions.push(vertex.x, vertex.y, vertex.z)

            // Color for debugging
            colors[index_cnt] = 1 - (i / 170.0)
            colors[index_cnt + 1] = i / 170.0
            colors[index_cnt + 2] = j / 40.0

            // index
            indexRow.push(index ++)
            index_cnt += 3;
        }
        indexArray.push(indexRow);
    }

    // generate indices
    let groupCount = 0;
		for ( let x = 0; x < 40; x ++ ) {
			for ( let y = 0; y < 170; y ++ ) {

				// we use the index array to access the correct indices
				const a = indexArray[ y ][ x ];
				const b = indexArray[ y + 1 ][ x ];
				const c = indexArray[ y + 1 ][ x + 1 ];
				const d = indexArray[ y ][ x + 1 ];
				// faces
				indices.push( a, b, d );
				indices.push( b, c, d );
			}
		}

    let geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setIndex(indices)

    return geometry
}

export default PenneRigate;

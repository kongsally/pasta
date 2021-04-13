import * as THREE from 'three'

// Rombi (a.k.a. Justin Reppert, the Sheared Hollow but Solid Aspiring Man)
function Rombi() {
    const positions = [];
    const colors = [];
    const indices = [];

    let index = 0;
    const indexArray = [];
    const vertex = new THREE.Vector3();

    let i_max = 50;
    let j_max = 50;

    let r,g,b
    for (let i = 0; i <= i_max; i++) {
        const indexRow = [];
        for (let j = 0; j <= j_max; j++) {
            r = i/i_max;
            g = 0.5;
            b = j/j_max;

            if (i >= 13 && i <= 37) {
              vertex.x = i/20 + j/25 - 1/20;
              vertex.z = 0;
            } else if (i<=13) {
              vertex.x = (3 * i / 65) + (j / 25);
              vertex.z = 0.2 * ((13 - i) / 13) * Math.cos(((2 * j + 12.5) / 25) * Math.PI);
            } else {
              vertex.x = (3 * i / 65) + (j / 25);
              vertex.z = (i-37)/65 * Math.cos((2*j + 37.5)/25 * Math.PI);
            }
            vertex.y = j/25;

            positions.push(vertex.x, vertex.y, vertex.z);
            colors.push(r,g,b);
            indexRow.push(index ++);
        }
        indexArray.push(indexRow);
    }

    for ( let i = 0; i < i_max; i++ ) {
		    for ( let j = 0; j < j_max; j++ ) {
				// we use the index array to access the correct indices
				const a = indexArray[ i ][ j ];
				const b = indexArray[ i + 1 ][ j ];
				const c = indexArray[ i + 1 ][ j + 1 ];
				const d = indexArray[ i ][ j + 1 ];
				// faces
				indices.push( a, b, d );
				indices.push( b, c, d );
			}
		}

    let geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setIndex(indices);
    return geometry;
}

export default Rombi;

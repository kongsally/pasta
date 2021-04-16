import * as THREE from 'three'

// Strozzapreti (a.k.a. Daniel Manesh, the Twisted and Semi-open Man)
function Strozzapreti() {
    const positions = [];
    const colors = [];
    const indices = [];
    let normals = [];

    let index = 0;
    const indexArray = [];
    const vertex = new THREE.Vector3();

    let i_max = 60;
    let j_max = 60;

    let r,g,b
    for (let i = 0; i <= i_max; i++) {
        const indexRow = [];
        for (let j = 0; j <= j_max; j++) {
            r = i/60.0;
            g = 0.5;
            b = j/60.0;

            if (i <= 30) {
              vertex.x = 0.5*(Math.cos(j/30*Math.PI)+
              Math.cos((2*i + j + 16)*Math.PI/40));
              vertex.y = 0.5*(Math.sin(j/30*Math.PI) +
              Math.sin((2*i + j + 16)*Math.PI/40));
            } else {
              vertex.x = 0.5 * Math.cos(j/40 * Math.PI) +
              0.5 * Math.cos((j+76)/40 * Math.PI) +
              0.5 * Math.cos(j/30 * Math.PI) +
              0.5 * Math.sin( (2*i - j) / 40 * Math.PI);
              vertex.y = 0.5 * Math.sin(j/40 * Math.PI) +
              0.5 * Math.sin((j+76)/40 * Math.PI) +
              0.5 * Math.sin(j/30 * Math.PI) +
              0.5 * Math.cos( (2*i - j) / 40 * Math.PI);
            }

            vertex.z = j/4;

            positions.push(vertex.x, vertex.y, vertex.z);
            colors.push(r,g,b);
            indexRow.push(index ++);
        }
        indexArray.push(indexRow);
    }

    for ( let y = 0; y < i_max; y ++ ) {
		    for ( let x = 0; x < j_max; x ++ ) {
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

    let geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute( 'normal', new THREE.Float32BufferAttribute( normals, 3 ) );
    geometry.setIndex(indices);
    return geometry;
}

export default Strozzapreti;

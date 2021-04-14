import * as THREE from 'three'

// Giglio Ondulato (a.k.a. Ricky Pai, the Heliocidal and Smooth [but not on the edges]
function GiglioOndulato() {
    let positions = [];
    let colors = [];
    let indices = [];

    let index = 0;
    let indexArray = [];
    let vertex = new THREE.Vector3();

    const i_max = 150;
    const j_max = 40;

    let r,g,b
    for (let i = 0; i <= i_max; i++) {
        let indexRow = [];
        for (let j = 0; j <= j_max; j++) {
            r = i/i_max;
            g = 0.5;
            b = j/j_max;

            let alpha = 0.6 + 0.03 * Math.pow((40 - j) / 40, 10) *
            Math.cos(Math.PI * (4 * i + 75) / 15) - 0.5 * Math.pow(Math.sin(Math.PI * j / 80), 0.6)
            let beta = Math.sin(2 * i * Math.PI / 75) +
            Math.pow(i / 150, 10) * (0.08 * Math.sin(Math.PI * j / 40) +
            0.03 * Math.sin(Math.PI * j / 5))

            vertex.x = alpha * Math.cos(2*i/75*Math.PI) + Math.pow(i/150, 10) *
                      0.08 * (Math.sin(j/40 * Math.PI) + 0.03 * Math.cos(j/5*Math.PI))
            vertex.y =(0.6 + 0.03 * Math.pow((40 -j)/40, 10) *
                      Math.sin(4*i/15 * Math.PI) - 0.5 * Math.pow(Math.sin(j/80 * Math.PI), 0.6)) * beta
            vertex.z = 1.1 * j/40 + 0.7 * (1 - Math.sin((150-i)/300 * Math.PI))

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

export default GiglioOndulato;

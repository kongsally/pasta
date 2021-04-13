import * as THREE from 'three'

// Taglierini (The Sophie Shears pasta of choice from Broders in Minneapolis)
function Taglierini() {
    const positions = []
    const colors = []
    const indices = []

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

            /*
            vertex.x = 0.4 * Math.cos(i/100 * Math.PI)
            vertex.y = 0.4 * Math.pow(Math.sin(i/4000 * Math.PI), 0.2) * Math.sin(i/100 * Math.PI)
            vertex.z = 3 * j /200 + 0.1 * Math.sin(i/125 * Math.PI)
            positions.push(vertex.x, vertex.y, vertex.z)
            colors.push(r,g,b)
            indexRow.push(index++)

            vertex.x *= 0.8
            vertex.y *= 0.9
            vertex.z *= 1.3
            positions.push(vertex.x, vertex.y, vertex.z)
            colors.push(r,g,b)

            vertex.x = 0.3 * Math.cos(i/100 * Math.PI)
            vertex.y = 0.3 * Math.sin(3 * i / 1000 * Math.PI) * Math.sin(i/50 * Math.PI)
            vertex.z = -0.05 + 3 * j/200 + 0.1 * Math.sin(i/125 * Math.PI)
            positions.push(vertex.x, vertex.y, vertex.z)
            colors.push(r,g,b)*/
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
			}
		}

    let geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    geometry.setIndex(indices)
    return geometry
}

export default Taglierini;

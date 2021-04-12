uniform float uSize;
uniform float uTime;

attribute vec3 color;
varying vec3 vColor;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // Finish set up
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    /**
    * Size
    */
    gl_PointSize = 2.5;

    vColor = color;
}

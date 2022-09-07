varying vec3 vertexNormal;
void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position + normal, 1);
    vertexNormal = normalMatrix * normal;
}
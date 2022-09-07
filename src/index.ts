import * as THREE from 'three'
import vertexShader from '../assets/shaders/vertex.glsl'
import fragmentShader from '../assets/shaders/fragment.glsl'
import atmosphereV from '../assets/shaders/atmosphereV.glsl'
import atmosphereF from '../assets/shaders/atmosphereF.glsl'

console.log(vertexShader)

function setup() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.z = 15;
    const renderer = new THREE.WebGLRenderer(
        {
            antialias: true,
        }
    );
    renderer.setClearColor("#000000");

    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    const sphereGeom = new THREE.SphereGeometry(5, 50, 50)

    const sphere = new THREE.Mesh(
        sphereGeom,
        new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {
                globeTexture: {
                    value: new THREE.TextureLoader().load('./assets/img/globe.jpg')
                }
            }
        }),
    );
    const atmosphere = new THREE.Mesh(
        sphereGeom,
        new THREE.ShaderMaterial({
            vertexShader: atmosphereV,
            fragmentShader: atmosphereF,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide,
        }),
    )

    scene.add(sphere);
    scene.add(atmosphere);

    const render = function() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
        sphere.rotation.x += 0.05;
    }
    render();
}

setup();
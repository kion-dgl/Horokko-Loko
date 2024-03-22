// ThreeJsComponent.tsx
import { component$, useStore, useVisibleTask$, useTask$ } from '@builder.io/qwik';
import * as THREE from 'three';
import { OrbitControls } from 'three-orbitcontrols-ts';

export default component$(() => {
    const store = useStore({
        width: 0,
        height: 0,
        cube: null as THREE.Mesh | null,
    });

    useVisibleTask$(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, store.width / store.height, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(store.width, store.height);

        const gridHelper = new THREE.GridHelper(10, 10);
        scene.add(gridHelper);

        const controls = new OrbitControls(camera, renderer.domElement);

        // Create a simple cube mesh and add it to the scene
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        store.cube = cube; // Store the cube for potential updates

        // Resize observer to adjust canvas on container resize
   

        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();


    });



    useTask$(({ track }) => {
        track(() => store.width);
        track(() => store.height);

        // Update camera and renderer on size change
        // ... (code from resize observer)
    });

    return (
        <div></div>
    );
});

// Function to update the cube (can be triggered from some user action or another store signal)
// function updateCube(cube: THREE.Mesh | null, newColor: string) {
//     if (!cube) return;
//     (cube.material as THREE.MeshBasicMaterial).color.set(newColor);
// }

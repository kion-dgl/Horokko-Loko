import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraControls } from '@react-three/drei';

export default function App() {
    const cameraControlRef = useRef<CameraControls | null>(null);

    return (

        <Canvas>
            <CameraControls ref={cameraControlRef} />
            <mesh>
                <boxGeometry />
                <meshBasicMaterial color={0xff0000}/>
            </mesh>
            <gridHelper args={[20, 20, 0xff0000, 'teal']} />
        </Canvas>

    );
}

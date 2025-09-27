import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, useGLTF, MeshDistortMaterial, Float, Sparkles } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import * as THREE from 'three';

function Island({ position, rotation, scale, color }) {
  const mesh = useRef();
  
  useFrame((state, delta) => {
    mesh.current.rotation.y += delta * 0.1;
    mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
  });

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh ref={mesh} castShadow receiveShadow>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.8}
          metalness={0.2}
          distort={0.4}
          speed={1}
        />
      </mesh>
      <Sparkles count={20} scale={2} size={2} speed={0.4} color={color} />
    </group>
  );
}

function FloatingCrystals() {
  const group = useRef();
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Island position={[-5, 0, -10]} rotation={[0.2, 0.3, 0.1]} scale={1.5} color="#7c3aed" />
      </Float>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
        <Island position={[5, -1, -15]} rotation={[0.1, -0.2, 0.05]} scale={1} color="#06b6d4" />
      </Float>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
        <Island position={[0, 1, -20]} rotation={[-0.1, 0.1, 0.05]} scale={0.8} color="#22c55e" />
      </Float>
    </group>
  );
}

export default function FloatingIslands() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, opacity: 0.3 }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Suspense fallback={null}>
          <FloatingCrystals />
          <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        <fog attach="fog" args={['#0b0f14', 10, 50]} />
      </Canvas>
    </div>
  );
}

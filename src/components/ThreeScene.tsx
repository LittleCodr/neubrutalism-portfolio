import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';
import ModelGLTF from './ModelGLTF';

function SpinningKnot() {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((_, delta: number) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.45;
    }
  });
  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <torusKnotGeometry args={[1.2, 0.38, 256, 32, 2, 3]} />
      <meshStandardMaterial
        color={new THREE.Color('#7c3aed')}
        emissive={new THREE.Color('#7c3aed')}
        emissiveIntensity={0.8}
        metalness={0.6}
        roughness={0.2}
      />
    </mesh>
  );
}

const ThreeScene: React.FC = () => {
  const [hasModel, setHasModel] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
    // Check if model exists
    fetch('/models/model.glb', { method: 'HEAD' })
      .then((res) => {
        if (!mounted) return;
        setHasModel(res.ok);
      })
      .catch(() => {
        if (!mounted) return;
        setHasModel(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <color attach="background" args={[0, 0, 0]} />
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={1.0} color={'#06b6d4'} />
      <pointLight position={[-5, -5, -3]} intensity={0.8} color={'#f43f5e'} />

      <Stars radius={60} depth={40} count={1200} factor={3} saturation={0} fade speed={1} />

      <Suspense
        fallback={
          <Html center>
            <div style={{ color: '#e5e7eb', fontFamily: 'Poppins, sans-serif' }}>Loading 3D…</div>
          </Html>
        }
      >
        {hasModel ? (
          <ModelGLTF url="/models/model.glb" />
        ) : (
          <SpinningKnot />
        )}
      </Suspense>

      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
    </Canvas>
  );
};

export default ThreeScene;

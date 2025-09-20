import React from 'react';
import { useGLTF } from '@react-three/drei';
import { Group } from 'three';

interface ModelGLTFProps {
  url: string;
  scale?: number | [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
}

const ModelGLTF: React.FC<ModelGLTFProps> = ({ url, scale = 1.2, position = [0, -0.6, 0], rotation = [0, Math.PI / 6, 0] }) => {
  const gltf = useGLTF(url) as unknown as { scene: Group };
  return <primitive object={gltf.scene} scale={scale} position={position} rotation={rotation} />;
};

useGLTF.preload('/models/model.glb');

export default ModelGLTF;

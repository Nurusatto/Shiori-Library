"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function SakuraPetal() {
  const ref = useRef<THREE.Mesh>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { viewport, camera } = useThree();

  const fallSpeed = useRef(0.003 + Math.random() * 0.002);
  const sideDrift = useRef((Math.random() - 0.5) * 0.002);
  const phase = useRef(Math.random() * Math.PI * 2);

  const initialRotationX = useRef(Math.PI / 4 + Math.random() * 0.3);
  const initialRotationY = useRef(Math.random() * Math.PI);
  const initialRotationZ = useRef(Math.random() * Math.PI);

  useFrame((state) => {
    if (!ref.current) return;

    ref.current.position.y -= fallSpeed.current;

    ref.current.position.x +=
      sideDrift.current +
      Math.sin(state.clock.elapsedTime * 0.5 + phase.current) * 0.001;

    ref.current.position.z +=
      Math.cos(state.clock.elapsedTime * 0.5 + phase.current) * 0.0008;

    ref.current.rotation.x += 0.001;
    ref.current.rotation.y += 0.001;
    ref.current.rotation.z += 0.002;

    if (ref.current.position.y < -viewport.height / 2) {
      ref.current.position.y = viewport.height / 2;
      ref.current.position.x = (Math.random() - 0.5) * viewport.width;
      ref.current.position.z = (Math.random() - 0.5) * 2;

      ref.current.rotation.x = initialRotationX.current;
      ref.current.rotation.y = initialRotationY.current;
      ref.current.rotation.z = initialRotationZ.current;
    }
  });

  return (
    <mesh
      ref={ref}
      position={[
        (Math.random() - 0.5) * viewport.width,
        Math.random() * viewport.height,
        (Math.random() - 0.5) * 2,
      ]}
      rotation={[
        initialRotationX.current,
        initialRotationY.current,
        initialRotationZ.current,
      ]}
      scale={0.8 + Math.random() * 0.4}
    >
      <planeGeometry args={[0.3, 0.4, 8, 8]} />
      <meshStandardMaterial
        color="#fbcfe8"
        side={THREE.DoubleSide}
        roughness={0.4}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

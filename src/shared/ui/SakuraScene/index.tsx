import { Canvas } from "@react-three/fiber";
import { SakuraPetal } from "../Sakura3D";

export function SakuraScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 3, 3]} />

      <SakuraPetal />
      <SakuraPetal />
      <SakuraPetal />
      <SakuraPetal />
      <SakuraPetal />
      <SakuraPetal />
      <SakuraPetal />
      <SakuraPetal />
      <SakuraPetal />
    </Canvas>
  );
}

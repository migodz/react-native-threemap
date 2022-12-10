import { Box } from "@react-three/drei";
import GestureOrthoCanvas from "./GestureOrthoCanvas";

export default function GestureCanvasTestView() {
  return (
    <GestureOrthoCanvas>
      {/* lights */}
      <ambientLight />
      <pointLight position={[10, 10, 10]} />

      {/* background plane */}
      <mesh position={[0, 0, -1]}>
        <boxGeometry args={[100, 100, 0.1]} />
        <meshStandardMaterial color="#292929" />
      </mesh>

      <Box args={[1, 1, 1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="yellow" />
      </Box>
    </GestureOrthoCanvas>
  );
}

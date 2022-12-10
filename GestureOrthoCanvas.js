import { OrthographicCamera } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber/native";
import { useEffect, useRef } from "react";
import { a } from "@react-spring/three";
import { cameraPan } from "./cameraGestures";

// A custom orthographic camera that enable gesture control
const GestureOrthographicCamera = (props) => {
  const cameraRef = useRef();
  const { set } = useThree();
  const [x, y] = cameraPan([-100, 100], { domTarget: window });

  // Make the camera known to the system
  useEffect(() => void set({ camera: cameraRef.current }), []);

  // Update it every frame
  useFrame(() => cameraRef.current.updateMatrixWorld());

  return (
    <a.orthographicCamera
      ref={cameraRef}
      position-x={x.to((x) => (x / 500) * 25)}
      position-y={y.to((y) => (y / 500) * 25)}
      position-z={10}
      {...props}
    />
  );
};

export default function GestureOrthoCanvas({ style, children }) {
  return (
    <Canvas style={style}>
      <GestureOrthographicCamera />
      {children}
    </Canvas>
  );
}

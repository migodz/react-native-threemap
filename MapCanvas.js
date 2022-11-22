import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber/native";
import { StyleSheet } from "react-native";
import { OrthographicCamera, Box, Plane } from "@react-three/drei/native";
import { PanResponder, Animated } from "react-native";
import { decode_json_map } from "./tools";
import  Svg, { Circle, Rect } from "react-native-svg";
import { View } from "@react-three/drei";

const MapView = (props) => {
  return props.tilemap.map((row, i) => {
    return row.map((tile, j) => {
      return (
        <Plane
          args={[0.1, 0.1]}
          position={[i * 0.1 - 5, j * 0.1 - 5, 0]}
          key={i + " " + j}
        >
          <meshBasicMaterial
            color={tile == -1 ? "black" : tile == 100 ? "grey" : "yellow"}
          />
        </Plane>
      );
    });
  });
};

const SvgTilemap = (props) => {
  const tiles = props.tilemap.map((row, i) => {
    return row.map((tile, j) => {
      return (
        <Rect
          key={i + " " + j}
          x={i}
          y={j}
          width="1"
          height="1"
          strokeWidth="0"
          fill={tile == -1 ? "black" : tile == 100 ? "grey" : "yellow"}
        />
      );
    });
  });

  return (
    <Svg height="100%" width="100%">
      {tiles}
    </Svg>
  );
};

const MapCanvas = () => {
  // set gesture handler
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
      onPanResponderRelease: () => {
        // pan.flattenOffset();
        Animated.spring(
          pan, // Auto-multiplexed
          { toValue: { x: 0, y: 0 } } // Back to zero
        ).start();
      },
    })
  ).current;

  // get tilemap from json file
  const tilemap = decode_json_map("./data/map_default.json");

  console.log(pan.x, pan.y);

  return (
    <Animated.View
      style={[pan.getLayout(), styles.container]}
      {...panResponder.panHandlers}
    >
      <Canvas>
        {/* camera */}
        <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={40} />

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
        

        {/* <Suspense fallback={null}>
          <MapView tilemap={tilemap}/> */}
          {/* <SvgTilemap tilemap={tilemap} />
          <Svg url="./data/1.svg" /> */}
        {/* </Suspense> */}

        {/* <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} /> */}
      </Canvas>
    </Animated.View>

    // <SvgTilemap tilemap={tilemap} />
  );
};

export default MapCanvas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
});

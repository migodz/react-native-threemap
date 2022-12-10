import { useCallback, useEffect } from "react";
import { useSpring, config } from "@react-spring/core";
import { useGesture } from "react-use-gesture";

/**
 * The pan gesture helper that can be used with cameras.
 * @param {*} bounds 
 * @param {*} props 
 * @returns 
 */
export function cameraPan(bounds, props) {
  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0, config: config.slow }));

  const fn = useCallback(
    ({ xy: [cx, cy], previous: [px, py], memox = x.get(), memoy = y.get() }) => {
      // const newX = clamp(memox + cx - px, ...bounds);
      const newX = memox + cx - px;
      if (bounds[0] > newX) newX = bounds[0];
      if (bounds[1] < newX) newX = bounds[1];
      // const newY = clamp(memoy + cy - py, ...bounds);
      const newY = memoy + cy - py;
      if (bounds[0] > newY) newY = bounds[0];
      if (bounds[1] < newY) newY = bounds[1];
      set({ x: newX, y: newY });
      return [newX, newY];
    },
    [bounds, x, y, set]
  );
  // const fn = useCallback(() => {console.log("test");}, []);
  
  const bind = useGesture({ onWheel: fn, onDrag: fn }, props);
  useEffect(() => props && props.domTarget && bind(), [props, bind]);

  return [x, y, bind];
}
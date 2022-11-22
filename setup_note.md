Create an empty react-native project with `expo`

```bash
expo init my-app
cd my-app
```

Install `expo-gl`

```bash
expo install expo-gl
```

Install `react-three-fiber`

```bash
npm install three @react-three/fiber
```

Install `react-three-drei`

```bash
npm install @react-three/drei
```

To use `react-three-drei`, we must have a `metro.config.js` file in the root folder with following content.

```javascript
module.exports = {
  resolver: {
    sourceExts: ['js', 'jsx', 'json', 'ts', 'tsx', 'cjs'],
    assetExts: ['glb', 'png', 'jpg'],
  },
}
```

With above settings, now we can use `react-three-fiber` & `react-three-drei` in our react-native project by importing things you want.

```javascript
import { ... } from '@react-three/fiber/native'
import { ... } from '@react-three/drei/native'
```

A `react-three-fiber` usage showcase.

```jsx
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber/native'
function Box(props) {
  const mesh = useRef(null)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}
export default function App() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </Canvas>
  )
}
```

However, controls in `react-three-drei` don't work in react-native now.

https://github.com/pmndrs/drei/issues/801

> Orbitcontrols from drei is just a wrapper around the three Orbitcontrols, three Orbitcontrols is tightly coupled to the dom since it adds event listeners for pointer and wheel events.
>
> So supporting this would out of the box seems to be out of question.
>
> by dineshsalunke

Possible substitution (but found no map controls):

https://github.com/EvanBacon/expo-three-orbit-controls

Or try to use react-native components (such as buttons) to control the view.

Map data:

- -1: nothing
- 100: wall
- 0: ground




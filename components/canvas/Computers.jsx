import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = ({}) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.1}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={0.45}
        position={[0, -2.35, -2]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [] = useState(false);
  return (
    <>
      {<Canvas
        frameloop="demand"
        shadows
        dpr={[1, 2]}
        camera={{ position: [20, 3, 5], fov: 25 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            enableZoom={true}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            autoRotate
            autoRotateSpeed={1}
          />
          <Computers />
        </Suspense>
        <Preload all />
      </Canvas>}
    </>
  );
};

export default ComputersCanvas;

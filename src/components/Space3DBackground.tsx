import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// Line-art Astronaut
const LineAstronaut = ({ position }: { position: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      groupRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * 0.3) * 0.5;
    }
  });

  const helmetPoints = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 32; i++) {
      const angle = (i / 32) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(angle) * 0.3, Math.sin(angle) * 0.35, 0));
    }
    return points;
  }, []);

  const bodyPoints = useMemo(() => [
    new THREE.Vector3(-0.25, -0.4, 0),
    new THREE.Vector3(-0.25, -1, 0),
    new THREE.Vector3(0.25, -1, 0),
    new THREE.Vector3(0.25, -0.4, 0),
    new THREE.Vector3(-0.25, -0.4, 0),
  ], []);

  const armPoints = useMemo(() => [
    new THREE.Vector3(-0.25, -0.5, 0),
    new THREE.Vector3(-0.5, -0.8, 0),
  ], []);

  const legPoints = useMemo(() => [
    new THREE.Vector3(-0.1, -1, 0),
    new THREE.Vector3(-0.15, -1.4, 0),
  ], []);

  return (
    <group ref={groupRef} position={position}>
      {/* Helmet */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={helmetPoints.length}
            array={new Float32Array(helmetPoints.flatMap(p => [p.x, p.y, p.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#4dd4e8" linewidth={2} />
      </line>
      {/* Body */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={bodyPoints.length}
            array={new Float32Array(bodyPoints.flatMap(p => [p.x, p.y, p.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#4dd4e8" linewidth={2} />
      </line>
      {/* Arms */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={armPoints.length}
            array={new Float32Array(armPoints.flatMap(p => [p.x, p.y, p.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#4dd4e8" linewidth={2} />
      </line>
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([0.25, -0.5, 0, 0.5, -0.8, 0])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#4dd4e8" linewidth={2} />
      </line>
      {/* Legs */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={legPoints.length}
            array={new Float32Array(legPoints.flatMap(p => [p.x, p.y, p.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#4dd4e8" linewidth={2} />
      </line>
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([0.1, -1, 0, 0.15, -1.4, 0])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#4dd4e8" linewidth={2} />
      </line>
    </group>
  );
};

// Line-art Spaceship
const LineSpaceship = ({ position }: { position: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * 0.4) * 0.5;
      groupRef.current.position.z = position[2] + Math.sin(state.clock.elapsedTime * 0.6) * 0.3;
    }
  });

  const bodyPoints = useMemo(() => [
    new THREE.Vector3(0, 0.5, 0),
    new THREE.Vector3(-0.3, -0.3, 0),
    new THREE.Vector3(0, -0.2, 0),
    new THREE.Vector3(0.3, -0.3, 0),
    new THREE.Vector3(0, 0.5, 0),
  ], []);

  const wingPoints = useMemo(() => [
    new THREE.Vector3(-0.3, -0.3, 0),
    new THREE.Vector3(-0.6, -0.5, 0),
  ], []);

  return (
    <group ref={groupRef} position={position}>
      {/* Body */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={bodyPoints.length}
            array={new Float32Array(bodyPoints.flatMap(p => [p.x, p.y, p.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#8b9dc3" linewidth={2} />
      </line>
      {/* Wings */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={wingPoints.length}
            array={new Float32Array(wingPoints.flatMap(p => [p.x, p.y, p.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#8b9dc3" linewidth={2} />
      </line>
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([0.3, -0.3, 0, 0.6, -0.5, 0])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#8b9dc3" linewidth={2} />
      </line>
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([0, -0.2, 0, 0, -0.6, 0])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#8b9dc3" linewidth={2} />
      </line>
    </group>
  );
};

// Grid lines for perspective
const GridLines = () => {
  const gridPoints = useMemo(() => {
    const points = [];
    const size = 20;
    const divisions = 20;

    for (let i = 0; i <= divisions; i++) {
      const pos = (i / divisions) * size - size / 2;
      points.push(
        new THREE.Vector3(-size / 2, pos, -10),
        new THREE.Vector3(size / 2, pos, -10),
        new THREE.Vector3(pos, -size / 2, -10),
        new THREE.Vector3(pos, size / 2, -10)
      );
    }
    return points;
  }, []);

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={gridPoints.length}
          array={new Float32Array(gridPoints.flatMap(p => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#3a4a6a" transparent opacity={0.15} />
    </lineSegments>
  );
};

// Connected dots pattern
const ConnectedDots = ({ position }: { position: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.3 + position[0]) * 0.2;
    }
  });

  const linePoints = useMemo(
    () => [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.8, 0, 0),
      new THREE.Vector3(0.8, 0.6, 0),
    ],
    []
  );

  return (
    <group ref={groupRef} position={position}>
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePoints.length}
            array={new Float32Array(linePoints.flatMap((p) => [p.x, p.y, p.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#4a6a8a" transparent opacity={0.6} />
      </line>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePoints.length}
            array={new Float32Array(linePoints.flatMap((p) => [p.x, p.y, p.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.1} color="#5a8aaa" />
      </points>
    </group>
  );
};

// Glowing Saturn with rings
const GlowingSaturn = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -5]}>
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#7aa8d4"
          emissive="#4a7fb8"
          emissiveIntensity={0.8}
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[1.6, 0.08, 16, 100]} />
        <meshStandardMaterial
          color="#5a8aaa"
          emissive="#3a6a8a"
          emissiveIntensity={0.7}
          transparent
          opacity={0.7}
        />
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={2} color="#7aa8d4" distance={5} />
    </group>
  );
};

// Final export
export const Space3DBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <color attach="background" args={['#1a2332']} />
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#4a7fb8" />

        {/* Starfield */}
        <Stars
          radius={100}
          depth={50}
          count={2000}
          factor={4}
          saturation={0}
          fade
          speed={0.5}
        />

        {/* Grid + Saturn */}
        <GridLines />
        <GlowingSaturn />

        {/* Astronauts */}
        <LineAstronaut position={[3, 1, -3]} />
        <LineAstronaut position={[-4, -1, -4]} />
        <LineAstronaut position={[2, -2, -6]} />

        {/* Spaceships */}
        <LineSpaceship position={[-3, 2, -2]} />
        <LineSpaceship position={[4, -1, -3]} />
        <LineSpaceship position={[-2, -3, -5]} />
        <LineSpaceship position={[5, 1, -4]} />
        <LineSpaceship position={[-5, 0, -6]} />

        {/* Connected dots */}
        <ConnectedDots position={[-6, 2, -7]} />
        <ConnectedDots position={[6, -2, -8]} />
        <ConnectedDots position={[-4, 3, -5]} />
        <ConnectedDots position={[3, -3, -6]} />
        <ConnectedDots position={[-2, 4, -9]} />
        <ConnectedDots position={[5, 3, -7]} />
      </Canvas>
    </div>
  );
};

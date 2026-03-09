import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Text, Line } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Plant, inverters } from '@/data/mock-data';
import { Card } from '@/components/ui/card';

interface PlantArchitecture3DProps {
  plant: Plant;
}

function ElectricityFlow({ start, end, active }: { start: [number, number, number]; end: [number, number, number]; active: boolean }) {
  const points = useMemo(() => [new THREE.Vector3(...start), new THREE.Vector3(...end)], [start, end]);
  
  return (
    <Line
      points={points}
      color={active ? "#00D4FF" : "#374151"}
      lineWidth={active ? 2 : 1}
      dashed={active}
      dashScale={50}
      dashSize={0.1}
      gapSize={0.05}
    />
  );
}

function SolarPanel({ position, status, label }: { position: [number, number, number]; status: 'online' | 'warning' | 'offline'; label: string }) {
  const color = status === 'online' ? '#10b981' : status === 'warning' ? '#f59e0b' : '#ef4444';
  
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[0.8, 0.05, 1.2]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
      </mesh>
      {status !== 'online' && (
        <mesh position={[0, 0.3, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
        </mesh>
      )}
    </group>
  );
}

function InverterUnit({ position, inverter }: { position: [number, number, number]; inverter: typeof inverters[0] }) {
  const color = inverter.status === 'online' ? '#3b82f6' : inverter.status === 'warning' ? '#f59e0b' : '#ef4444';
  
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[1.5, 2, 0.8]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
      </mesh>
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {inverter.name}
      </Text>
      {inverter.status !== 'online' && (
        <mesh position={[0, 0, 0.6]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
        </mesh>
      )}
    </group>
  );
}

function GridConnection({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh>
        <cylinderGeometry args={[0.3, 0.3, 3, 16]} />
        <meshStandardMaterial color="#9333ea" metalness={0.8} roughness={0.2} />
      </mesh>
      <Text
        position={[0, 2, 0]}
        fontSize={0.4}
        color="#00D4FF"
        anchorX="center"
        anchorY="middle"
      >
        GRID
      </Text>
    </group>
  );
}

function PlantScene({ plant }: { plant: Plant }) {
  // Layout configuration
  const panelRows = 4;
  const panelsPerRow = 6;
  const panelSpacing = 1.5;
  const inverterSpacing = 4;
  
  // Generate panel positions (left side)
  const panels = useMemo(() => {
    const result = [];
    for (let row = 0; row < panelRows; row++) {
      for (let col = 0; col < panelsPerRow; col++) {
        const status = Math.random() > 0.85 ? (Math.random() > 0.5 ? 'warning' : 'offline') : 'online';
        result.push({
          position: [col * panelSpacing - 8, 0.5, row * panelSpacing - 3] as [number, number, number],
          status: status as 'online' | 'warning' | 'offline',
          label: `P${row * panelsPerRow + col + 1}`
        });
      }
    }
    return result;
  }, []);

  // Position inverters (center)
  const inverterPositions = useMemo(() => {
    return inverters.slice(0, 4).map((inv, i) => ({
      inverter: inv,
      position: [2, 1, i * inverterSpacing - 6] as [number, number, number]
    }));
  }, []);

  // Grid connection (right side)
  const gridPosition: [number, number, number] = [10, 1.5, 0];

  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, 10, -10]} intensity={0.5} color="#00D4FF" />

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 20]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.1} roughness={0.9} />
      </mesh>

      {/* Solar panels */}
      {panels.map((panel, i) => (
        <SolarPanel key={`panel-${i}`} {...panel} />
      ))}

      {/* Inverters */}
      {inverterPositions.map((inv, i) => (
        <InverterUnit key={`inv-${i}`} {...inv} />
      ))}

      {/* Grid connection */}
      <GridConnection position={gridPosition} />

      {/* Electricity flow lines - Panels to Inverters */}
      {panels.slice(0, 6).map((panel, i) => {
        const inverterIdx = Math.floor(i / 2);
        return (
          <ElectricityFlow
            key={`flow-p-i-${i}`}
            start={panel.position}
            end={inverterPositions[inverterIdx % inverterPositions.length].position}
            active={panel.status === 'online'}
          />
        );
      })}

      {/* Electricity flow lines - Inverters to Grid */}
      {inverterPositions.map((inv, i) => (
        <ElectricityFlow
          key={`flow-i-g-${i}`}
          start={inv.position}
          end={gridPosition}
          active={inv.inverter.status === 'online'}
        />
      ))}

      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        maxPolarAngle={Math.PI / 2}
        minDistance={8}
        maxDistance={25}
      />
      <PerspectiveCamera makeDefault position={[0, 12, 15]} fov={60} />
    </>
  );
}

export function PlantArchitecture3D({ plant }: PlantArchitecture3DProps) {
  return (
    <Card className="w-full h-[600px] bg-card border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Plant Architecture - 3D View</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Interactive visualization • Drag to rotate • Scroll to zoom • Faults highlighted
        </p>
      </div>
      <div className="w-full h-[calc(100%-80px)]">
        <Canvas shadows>
          <PlantScene plant={plant} />
        </Canvas>
      </div>
    </Card>
  );
}

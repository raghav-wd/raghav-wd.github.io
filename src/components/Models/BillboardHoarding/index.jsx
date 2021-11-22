import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function BillboardHoarding({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('./libs/billboard_hoarding/scene.gltf')
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[0, 0, -Math.PI]}>
          <mesh
            geometry={nodes.Cylinder_0.geometry}
            material={materials.BillBoardConcrete}
          />
        </group>
        <group position={[0, 0, 7.32]}>
          <mesh
            geometry={nodes.Cube_0.geometry}
            material={materials.BillboardBack}
          />
          <mesh
            geometry={nodes.Cube_1.geometry}
            material={materials.BillBoardPoster}
          />
        </group>
        <group position={[0, 0.18, 7.32]}>
          <mesh
            geometry={nodes.Cube001_0.geometry}
            material={nodes.Cube001_0.material}
          />
        </group>
        <group position={[1.01, 0.18, 7.32]}>
          <mesh
            geometry={nodes.Cube002_0.geometry}
            material={nodes.Cube002_0.material}
          />
        </group>
        <group position={[2.02, 0.18, 7.31]}>
          <mesh
            geometry={nodes.Cube003_0.geometry}
            material={nodes.Cube003_0.material}
          />
        </group>
        <group position={[-1.01, 0.18, 7.31]}>
          <mesh
            geometry={nodes.Cube004_0.geometry}
            material={nodes.Cube004_0.material}
          />
        </group>
        <group position={[-2.02, 0.18, 7.31]}>
          <mesh
            geometry={nodes.Cube005_0.geometry}
            material={nodes.Cube005_0.material}
          />
        </group>
        <group position={[-6.05, 0.18, 7.31]}>
          <mesh
            geometry={nodes.Cube006_0.geometry}
            material={nodes.Cube006_0.material}
          />
        </group>
        <group position={[6.05, 0.18, 7.31]}>
          <mesh
            geometry={nodes.Cube007_0.geometry}
            material={nodes.Cube007_0.material}
          />
        </group>
        <group position={[0, -0.67, 5.12]} scale={[0.22, 0.22, 0.01]}>
          <mesh
            geometry={nodes.Cube008_0.geometry}
            material={nodes.Cube008_0.material}
          />
        </group>
        <group position={[-3.02, 0.18, 7.31]}>
          <mesh
            geometry={nodes.Cube009_0.geometry}
            material={nodes.Cube009_0.material}
          />
        </group>
        <group position={[3.02, 0.18, 7.31]}>
          <mesh
            geometry={nodes.Cube010_0.geometry}
            material={nodes.Cube010_0.material}
          />
        </group>
        <group position={[4.03, 0.18, 7.31]}>
          <mesh
            geometry={nodes.Cube011_0.geometry}
            material={nodes.Cube011_0.material}
          />
        </group>
        <group position={[-4.03, 0.18, 7.31]}>
          <mesh
            geometry={nodes.Cube012_0.geometry}
            material={nodes.Cube012_0.material}
          />
        </group>
        <group position={[5.04, 0.18, 7.31]}>
          <mesh
            geometry={nodes.Cube013_0.geometry}
            material={nodes.Cube013_0.material}
          />
        </group>
        <group position={[-5.04, 0.18, 7.31]}>
          <mesh
            geometry={nodes.Cube014_0.geometry}
            material={nodes.Cube014_0.material}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/scene.gltf')

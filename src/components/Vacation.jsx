/* eslint-disable */
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: JonhGillessen (https://sketchfab.com/JonhGillessen)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/models/a5b47f042b854aa887523e49af8ee8d8
title: 3 seconds of vacations
*/

import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Vacation({props}) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('./libs/3_seconds_of_vacations/scene.gltf')
  const { actions } = useAnimations(animations, group)
  useEffect(() => {
    actions[Object.keys(actions)[0]].play()
    // console.log(actions[0].play()
  })
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group position={[1.77, -2.28, -0.62]} rotation={[-0.19, 0.61, 0.06]} scale={1.12}>
          <mesh geometry={nodes.Cylinder014_0.geometry} material={nodes.Cylinder014_0.material} />
        </group>
        <group position={[-1.14, 1.23, -0.84]}>
          <mesh
            name="Plane029_0"
            geometry={nodes.Plane029_0.geometry}
            material={nodes.Plane029_0.material}
            morphTargetDictionary={nodes.Plane029_0.morphTargetDictionary}
            morphTargetInfluences={nodes.Plane029_0.morphTargetInfluences}
          />
        </group>
        <group position={[-1.14, 1.23, -0.84]}>
          <group position={[0.74, 0.06, 0.21]} rotation={[0.5, 0.42, 0.72]}>
            <mesh geometry={nodes.Vert001_0.geometry} material={nodes.Vert001_0.material} />
          </group>
          <group position={[0.07, -0.38, 0.06]}>
            <mesh geometry={nodes.Cylinder016_0.geometry} material={nodes.Cylinder016_0.material} />
          </group>
          <group position={[-0.64, -0.04, 0.13]} rotation={[0, 0, -3.08]} scale={[0.83, 0.83, 0.83]}>
            <mesh geometry={nodes.Plane011_0.geometry} material={nodes.Plane011_0.material} />
          </group>
          <mesh geometry={nodes.Plane_0.geometry} material={nodes.Plane_0.material} />
        </group>
        <group position={[1.43, -1.08, -0.17]} rotation={[-0.06, 0.19, 0.01]} scale={0.69}>
          <mesh geometry={nodes.Cylinder013_0.geometry} material={nodes.Cylinder013_0.material} />
        </group>
        <group position={[0.34, -2.52, -0.66]} rotation={[0.47, -0.24, -0.06]} scale={0.87}>
          <mesh geometry={nodes.Cylinder015_0.geometry} material={nodes.Cylinder015_0.material} />
        </group>
        <group position={[-1.02, -2.13, -0.63]} rotation={[0.18, -0.47, -0.12]} scale={1.12}>
          <mesh geometry={nodes.Cylinder018_0.geometry} material={nodes.Cylinder018_0.material} />
        </group>
        <group position={[-0.78, -0.84, -0.18]} rotation={[-0.14, -0.29, -0.28]} scale={1.27}>
          <mesh geometry={nodes.Cylinder019_0.geometry} material={nodes.Cylinder019_0.material} />
        </group>
        <group position={[0.58, -0.16, -0.16]} rotation={[-0.57, 0.24, -0.5]} scale={1.35}>
          <mesh geometry={nodes.Cylinder020_0.geometry} material={nodes.Cylinder020_0.material} />
        </group>
        <group position={[0.97, 0.6, 0.26]}>
          <mesh geometry={nodes.Plane034_0.geometry} material={nodes.Plane034_0.material} />
          <mesh geometry={nodes.Plane002_0.geometry} material={nodes.Plane002_0.material} />
        </group>
        <group position={[-0.1, -0.31, 0.38]} rotation={[0, 0, -0.58]}>
          <mesh geometry={nodes.Plane013_0.geometry} material={nodes.Plane013_0.material} />
        </group>
        <group position={[0.95, -0.39, 3.26]} rotation={[0, 0, 0.64]} scale={0.08}>
          <mesh
            name="Sphere_0"
            geometry={nodes.Sphere_0.geometry}
            material={nodes.Sphere_0.material}
            morphTargetDictionary={nodes.Sphere_0.morphTargetDictionary}
            morphTargetInfluences={nodes.Sphere_0.morphTargetInfluences}
          />
        </group>
        <group position={[0.06, 0.31, 0.76]} rotation={[0.1, -0.21, 0.02]} scale={1.09}>
          <mesh geometry={nodes.Sphere003_0.geometry} material={nodes.Sphere003_0.material} />
        </group>
        <group position={[-0.91, -0.92, 0.98]}>
          <mesh geometry={nodes.Plane025_0.geometry} material={nodes.Plane025_0.material} />
        </group>
        <group position={[-0.86, -1.45, 0.98]} rotation={[0, 0, 0.19]}>
          <mesh geometry={nodes.Plane026_0.geometry} material={nodes.Plane026_0.material} />
        </group>
        <group position={[-0.75, -0.46, 0.97]} rotation={[0, 0, -0.68]}>
          <mesh geometry={nodes.Plane027_0.geometry} material={nodes.Plane027_0.material} />
        </group>
        <group position={[-1.26, -0.69, -0.53]}>
          <mesh geometry={nodes.Vert_0.geometry} material={nodes.Vert_0.material} />
        </group>
        <group position={[-0.97, -3.5, -1.37]}>
          <mesh geometry={nodes.Plane028_0.geometry} material={nodes.Plane028_0.material} />
        </group>
        <group position={[-0.19, 0.06, -0.67]} scale={0.26}>
          <mesh geometry={nodes.Plane006_0.geometry} material={nodes.Plane006_0.material} />
        </group>
        <group position={[0.43, -0.98, -1.02]} scale={9.13}>
          <mesh
            name="Circle_0"
            geometry={nodes.Circle_0.geometry}
            material={nodes.Circle_0.material}
            morphTargetDictionary={nodes.Circle_0.morphTargetDictionary}
            morphTargetInfluences={nodes.Circle_0.morphTargetInfluences}
          />
        </group>
        <group position={[0.39, -2.32, -1.02]} scale={0.43}>
          <mesh geometry={nodes.Sphere002_0.geometry} material={nodes.Sphere002_0.material} />
        </group>
        <group position={[-0.42, 0.17, 0.05]} rotation={[0.1, 0.01, -0.02]}>
          <mesh geometry={nodes.Plane001_0.geometry} material={nodes.Plane001_0.material} />
        </group>
        <group position={[1.44, -0.96, -0.88]} rotation={[0, 0, 1.76]} scale={[0.26, 0.26, 0.26]}>
          <mesh geometry={nodes.Plane008_0.geometry} material={nodes.Plane008_0.material} />
        </group>
        <group position={[0.21, -1.16, 1.11]} scale={0.54}>
          <mesh
            name="tree_0"
            geometry={nodes.tree_0.geometry}
            material={nodes.tree_0.material}
            morphTargetDictionary={nodes.tree_0.morphTargetDictionary}
            morphTargetInfluences={nodes.tree_0.morphTargetInfluences}
          />
        </group>
        <group position={[0.25, -1.11, 0.09]}>
          <mesh geometry={nodes.Plane010_0.geometry} material={nodes.Plane010_0.material} />
        </group>
        <group position={[0.25, -1.12, 0.08]}>
          <mesh geometry={nodes.Plane004_0.geometry} material={nodes.Plane004_0.material} />
        </group>
        <group position={[0.92, -1.66, 0.04]} rotation={[0, 0, 1.76]} scale={[0.26, 0.26, 0.26]}>
          <mesh geometry={nodes.Plane018_0.geometry} material={nodes.Plane018_0.material} />
        </group>
        <group position={[0.21, -1.16, 1.23]}>
          <mesh geometry={nodes.Circle001_0.geometry} material={nodes.Circle001_0.material} />
        </group>
        <group position={[0.27, -1.13, 0.63]} rotation={[0, 0, 1.76]} scale={[0.26, 0.26, 0.26]}>
          <mesh geometry={nodes.Plane005_0.geometry} material={nodes.Plane005_0.material} />
        </group>
        <group position={[0.21, -1.16, 1.11]}>
          <mesh geometry={nodes.Plane007_0.geometry} material={nodes.Plane007_0.material} />
        </group>
        <group position={[0.51, -1.78, 0.39]}>
          <mesh geometry={nodes.Cylinder_0.geometry} material={nodes.Cylinder_0.material} />
        </group>
        <group position={[0.51, -1.62, 0.38]} scale={0.05}>
          <mesh geometry={nodes.Circle002_0.geometry} material={nodes.Circle002_0.material} />
        </group>
        <group position={[-0.59, -3.43, -1.06]}>
          <mesh geometry={nodes.Sphere001_0.geometry} material={nodes.Sphere001_0.material} />
        </group>
        <group position={[-0.17, -2.93, -1.06]}>
          <mesh geometry={nodes.Sphere004_0.geometry} material={nodes.Sphere004_0.material} />
        </group>
        <group position={[0.83, -0.85, 0.21]} rotation={[0, 0, 1.76]} scale={[0.26, 0.26, 0.26]}>
          <mesh geometry={nodes.Plane003_0.geometry} material={nodes.Plane003_0.material} />
        </group>
        <group position={[-0.28, -1.43, 0.18]} rotation={[0, 0, 1.76]} scale={[0.26, 0.26, 0.26]}>
          <mesh geometry={nodes.Plane012_0.geometry} material={nodes.Plane012_0.material} />
        </group>
        <group position={[0.73, -2.12, 2.06]} scale={0.02}>
          <mesh
            name="Mball003_0"
            geometry={nodes.Mball003_0.geometry}
            material={nodes.Mball003_0.material}
            morphTargetDictionary={nodes.Mball003_0.morphTargetDictionary}
            morphTargetInfluences={nodes.Mball003_0.morphTargetInfluences}
          />
        </group>
        <group position={[-0.36, -0.5, 0.14]}>
          <mesh geometry={nodes.Circle004_0.geometry} material={nodes.Circle004_0.material} />
        </group>
        <group position={[1.03, -2.13, -0.5]} rotation={[-0.04, -0.09, 1.15]} scale={[0.06, 0.06, 0.06]}>
          <mesh
            name="Cylinder005_0"
            geometry={nodes.Cylinder005_0.geometry}
            material={nodes.Cylinder005_0.material}
            morphTargetDictionary={nodes.Cylinder005_0.morphTargetDictionary}
            morphTargetInfluences={nodes.Cylinder005_0.morphTargetInfluences}
          />
        </group>
        <group position={[-0.06, -1.98, -0.11]} rotation={[0.61, -0.14, 0.04]} scale={[1.12, 1.12, 1.12]}>
          <mesh geometry={nodes.Cylinder017_0.geometry} material={nodes.Cylinder017_0.material} />
        </group>
        <group position={[0.97, 0.6, -0.41]}>
          <mesh geometry={nodes.Cylinder021_0.geometry} material={nodes.Cylinder021_0.material} />
        </group>
        <group position={[0.96, -0.56, 1.08]} rotation={[0, 0, 0.68]} scale={[0.07, 0.07, 0.06]}>
          <mesh geometry={nodes.Cube001_0.geometry} material={nodes.Cube001_0.material} />
        </group>
        <group position={[0.93, -0.55, 1.07]} rotation={[-1.61, 0.92, 0.68]} scale={[0.02, 0.02, 0.02]}>
          <mesh geometry={nodes.Cylinder022_0.geometry} material={nodes.Cylinder022_0.material} />
        </group>
        <group position={[0.97, 0.6, -0.3]}>
          <mesh geometry={nodes.Cylinder023_0.geometry} material={nodes.Cylinder023_0.material} />
        </group>
        <group position={[0, 0.53, 0.05]}>
          <mesh geometry={nodes.Plane009_0.geometry} material={nodes.Plane009_0.material} />
        </group>
        <group position={[0.21, -1.16, -1.03]} scale={4.34}>
          <mesh geometry={nodes.Circle003_0.geometry} material={nodes.Circle003_0.material} />
        </group>
        <group position={[0.27, -1.13, 0.63]}>
          <mesh geometry={nodes.Plane014_0.geometry} material={nodes.Plane014_0.material} />
        </group>
        <group position={[1.12, -0.95, 0.29]} rotation={[0, 0, 1.76]} scale={[0.23, 0.24, 0.26]}>
          <mesh geometry={nodes.Plane016_0.geometry} material={nodes.Plane016_0.material} />
        </group>
        <group position={[0.27, -1.13, 0.63]}>
          <mesh geometry={nodes.Plane017_0.geometry} material={nodes.Plane017_0.material} />
        </group>
        <group position={[0.27, -1.13, 0.63]} rotation={[0, 0, -2.05]}>
          <mesh geometry={nodes.Plane019_0.geometry} material={nodes.Plane019_0.material} />
        </group>
        <group position={[-0.67, -1.39, 0.5]} rotation={[0, 0, 3.03]}>
          <mesh geometry={nodes.Plane020_0.geometry} material={nodes.Plane020_0.material} />
        </group>
        <group position={[0, 0.68, 0.05]}>
          <mesh
            name="Plane021_0"
            geometry={nodes.Plane021_0.geometry}
            material={nodes.Plane021_0.material}
            morphTargetDictionary={nodes.Plane021_0.morphTargetDictionary}
            morphTargetInfluences={nodes.Plane021_0.morphTargetInfluences}
          />
        </group>
        <group position={[0.17, 0.27, 0.08]} scale={[1, 1, 0.38]}>
          <mesh geometry={nodes.Cylinder024_0.geometry} material={nodes.Cylinder024_0.material} />
        </group>
        <group position={[0.2, 0.53, 0.13]} scale={0.07}>
          <mesh geometry={nodes.Circle005_0.geometry} material={nodes.Circle005_0.material} />
        </group>
        <group position={[0.91, -1.97, 1.2]}>
          <mesh geometry={nodes.Cylinder025_0.geometry} material={nodes.Cylinder025_0.material} />
        </group>
        <group position={[0.82, -2.15, -0.26]} rotation={[0, 0, 0.58]} scale={[0.26, 0.26, 0.26]}>
          <mesh geometry={nodes.Plane022_0.geometry} material={nodes.Plane022_0.material} />
        </group>
        <group position={[0.91, -1.97, 1.2]}>
          <mesh geometry={nodes.Cylinder026_0.geometry} material={nodes.Cylinder026_0.material} />
        </group>
        <group position={[0.25, -1.11, 1.02]}>
          <mesh geometry={nodes.Plane023_0.geometry} material={nodes.Plane023_0.material} />
        </group>
        <group position={[-0.6, -1.38, 0.35]} rotation={[0, 0, -1.33]} scale={[0.23, 0.24, 0.26]}>
          <mesh geometry={nodes.Plane015_0.geometry} material={nodes.Plane015_0.material} />
        </group>
        <group position={[0, -1.97, 0.34]} rotation={[0, 0, -0.34]} scale={[0.23, 0.24, 0.26]}>
          <mesh geometry={nodes.Plane024_0.geometry} material={nodes.Plane024_0.material} />
        </group>
        <group position={[-1.25, -0.7, -0.57]} rotation={[-0.02, 0.15, 0.26]} scale={[1.27, 1, 1]}>
          <mesh geometry={nodes.Torus_0.geometry} material={nodes.Torus_0.material} />
        </group>
        <group position={[-1.28, -0.71, -0.72]}>
          <mesh geometry={nodes.Cylinder027_0.geometry} material={nodes.Cylinder027_0.material} />
        </group>
        <group position={[-1.25, -0.7, -0.57]} rotation={[-0.02, 0.15, 0.26]} scale={[1.27, 1, 1]}>
          <mesh geometry={nodes.Torus001_0.geometry} material={nodes.Torus001_0.material} />
        </group>
        <group position={[1.31, -1.14, -0.81]} scale={0.83}>
          <mesh geometry={nodes.Sphere005_0.geometry} material={nodes.Sphere005_0.material} />
        </group>
        <group position={[1.19, -0.89, -0.73]} rotation={[0, -0.47, 0]} scale={[0.71, 0.71, 0.71]}>
          <mesh geometry={nodes.Sphere006_0.geometry} material={nodes.Sphere006_0.material} />
        </group>
        <group position={[1.06, -1.13, -0.54]} rotation={[-0.25, -0.12, 1.39]} scale={[0.71, 0.71, 0.71]}>
          <mesh geometry={nodes.Sphere007_0.geometry} material={nodes.Sphere007_0.material} />
        </group>
        <group position={[0.41, -1.66, 0.38]} rotation={[-1.91, 0.24, 1.64]} scale={[0.36, 0.36, 0.36]}>
          <mesh geometry={nodes.Plane032_0.geometry} material={nodes.Plane032_0.material} />
        </group>
        <group position={[0.27, -1.13, 0.63]} rotation={[0, 0, 1.76]} scale={[0.26, 0.26, 0.26]}>
          <mesh geometry={nodes.Plane033_0.geometry} material={nodes.Plane033_0.material} />
        </group>
        <group position={[0.41, -1.66, 0.38]} rotation={[0, 0, 1.24]} scale={[0.05, 0.05, 0.05]}>
          <mesh geometry={nodes.Circle006_0.geometry} material={nodes.Circle006_0.material} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/scene.gltf')

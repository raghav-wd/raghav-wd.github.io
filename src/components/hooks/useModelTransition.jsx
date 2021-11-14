import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

const useModelTransition = (page) => {
  const focusOnPosition = new THREE.Vector3(-10, 0.5, 10)
  const animateToPosition = new THREE.Vector3(0, 2, 5)

  const damp = (target, to, step, delta, v = new THREE.Vector3()) => {
    if (target instanceof THREE.Vector3) {
      // eslint-disable-next-line no-param-reassign
      target.x = THREE.MathUtils.damp(target.x, to[0], step, delta)
      // eslint-disable-next-line no-param-reassign
      target.y = THREE.MathUtils.damp(target.y, to[1], step, delta)
      // eslint-disable-next-line no-param-reassign
      target.z = THREE.MathUtils.damp(target.z, to[2], step, delta)
    }
  }
  // Takes default camera for transistion ...
  useFrame((state, delta) => {
    if (page === 'skills') {
      const step = 2
      // eslint-disable-next-line no-param-reassign
      state.camera.fov = THREE.MathUtils.damp(state.camera.fov, 20, step, delta)
      damp(state.camera.position, [...animateToPosition], step, delta)
      state.camera.lookAt(...focusOnPosition)
      state.camera.updateProjectionMatrix()
    }
  })
}

export default useModelTransition
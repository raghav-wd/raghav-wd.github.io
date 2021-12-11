import { useEffect } from 'react'
import { useStore } from '../../store'

const usePersonControls = () => {
  const [setMovementUp, setMovementDown] = useStore((state) => [
    state.setMovementUp,
    state.setMovementDown,
  ])

  useEffect(() => {
    const handleKeyDown = (e) => {
      setMovementDown(e)
    }
    const handleKeyUp = (e) => {
      setMovementUp(e)
    }
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])
}

export default usePersonControls

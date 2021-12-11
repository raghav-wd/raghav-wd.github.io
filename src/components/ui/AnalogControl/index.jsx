import { Joystick } from 'react-joystick-component'
import { useStore } from '../../../store'
import './main.css'

const AnalogControl = () => {
  const keys = {
    forward: 'KeyW',
    backward: 'KeyS',
    left: 'KeyA',
    right: 'KeyD',
    dance: 'KeyE',
    reset: 'KeyR',
    jump: 'Space',
  }
  const moveFieldByKey = (key) => keys[key]
  const setMovementDown = useStore((state) => state.setMovementDown)
  const setMovementUp = useStore((state) => state.setMovementUp)

  const handleMove = (e) => {
    const obj = { code: moveFieldByKey(e.direction.toLowerCase()) }
    setMovementDown(obj)
  }

  const handleStop = () => {
    setMovementUp()
  }

  return (
    <div className="analog-control">
      <div className="joystick">
        <Joystick
          size={100}
          baseColor="#ffffff26"
          stickColor="#827717dd"
          move={handleMove}
          stop={handleStop}
        />
      </div>
    </div>
  )
}

export default AnalogControl

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useRef } from 'react'
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
  const timer = useRef()
  const moveFieldByKey = (key) => keys[key]
  const setMovementDown = useStore((state) => state.setMovementDown)
  const setMovementUp = useStore((state) => state.setMovementUp)
  const setPersonActivityState = useStore(
    (state) => state.setPersonActivityState
  )
  const setPersonActivityStateDefault = useStore(
    (state) => state.setPersonActivityStateDefault
  )

  const handleMove = (e) => {
    const obj = { code: moveFieldByKey(e.direction.toLowerCase()) }
    clearTimeout(timer.current)
    setMovementDown(obj)
  }

  const handleStop = () => {
    setMovementUp()
  }

  const activityKeyHandler = (activity) => {
    switch (activity) {
      case 'dance': {
        setPersonActivityState(activity)
        timer.current = setTimeout(
          () => setPersonActivityStateDefault(activity),
          12899
        )
        break
      }
      case 'jump': {
        setPersonActivityState(activity)
        timer.current = setTimeout(
          () => setPersonActivityStateDefault(activity),
          1500
        )
        break
      }
      case 'reset': {
        setPersonActivityState(activity)
        break
      }
      default: {
        break
      }
    }
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
      <div className="activity-keys-container">
        <div className="activity-keys">
          <div className="activity-key">
            <img
              src="./images/mirror-ball.png"
              alt="dance"
              onClick={() => activityKeyHandler('dance')}
            />
          </div>
          <div className="activity-key">
            <img
              src="./images/avatar.png"
              alt="avatar"
              onClick={() => activityKeyHandler('jump')}
            />
          </div>
          <div className="activity-key">
            <img
              src="./images/redo-arrow.png"
              alt="redo arrow"
              onClick={() => activityKeyHandler('reset')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalogControl

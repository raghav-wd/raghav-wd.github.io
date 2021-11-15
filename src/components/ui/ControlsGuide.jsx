import { useState, useEffect } from 'react'
import { useSpring, animated, useTransition } from 'react-spring'

const ControlsGuide = ({
  // eslint-disable-next-line react/prop-types
  activeControlIntroduction,
  // eslint-disable-next-line react/prop-types
  setActiveControlIntroduction,
}) => {
  const [isActive, setIsActive] = useState(true)
  const fade = useSpring({
    opacity: isActive ? 1 : 0,
  })

  useEffect(() => {
    const handleKeyDown = (e) => {
      setIsActive(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <animated.div className="ControlsIntroduction" style={fade}>
      <div className="ControlsWrapper">
        <svg
          className="KeyboardGFX"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 61 40"
        >
          <g fillRule="evenodd">
            <path d="M17.54 21c.8 0 1.46.65 1.46 1.46v16.08c0 .8-.66 1.46-1.46 1.46H1.46C.66 40 0 39.35 0 38.54V22.46C0 21.66.66 21 1.46 21zM11 28l-5 2.5 5 2.5v-5zm32.46-7c-.8 0-1.46.65-1.46 1.46v16.08c0 .8.66 1.46 1.46 1.46h16.08c.8 0 1.46-.65 1.46-1.46V22.46c0-.8-.66-1.46-1.46-1.46zM50 28l5 2.5-5 2.5v-5zM40 17.54c0 .8-.65 1.46-1.46 1.46H22.46c-.8 0-1.46-.66-1.46-1.46V1.46c0-.8.65-1.46 1.46-1.46h16.08c.8 0 1.46.66 1.46 1.46zM33 11l-2.5-5-2.5 5h5zm7 11.46c0-.8-.65-1.46-1.46-1.46H22.46c-.8 0-1.46.66-1.46 1.46v16.08c0 .8.65 1.46 1.46 1.46h16.08c.8 0 1.46-.66 1.46-1.46zM33 29l-2.5 5-2.5-5h5z" />
          </g>
        </svg>
        <span className="ControlsTextForward">Forward</span>{' '}
        <span className="ControlsTextBackward">Back</span>{' '}
        <span className="ControlsTextLeft">Left</span>{' '}
        <span className="ControlsTextRight">Rotate</span>{' '}
      </div>
      <p className="KeyboardDescription">
        Use the arrow keys to control the player and explore my portfolio.
      </p>
    </animated.div>
  )
}

export default ControlsGuide

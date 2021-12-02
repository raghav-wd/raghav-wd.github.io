import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import './game.css'

const Game = ({ isLost, setIsLost }) => {
  const [score, setScore] = useState(0)
  const countRef = useRef(null)

  useEffect(() => {
    setIsLost(false)
    countRef.current = setInterval(() => {
      setScore((s) => s + 1)
    }, 100)
    return () => {
      setIsLost(false)
      // clearTimeout(countRef.current)
    }
  }, [])

  useEffect(() => {
    if (isLost) clearInterval(countRef.current)
    // countRef.current = 0
  }, [isLost])

  const addZero = (num) => (num % 1 === 0 ? `${num}.0` : num)

  return (
    <div className="about-page-container">
      <div className="game-page">
        <div className="scoreboard">Score: {addZero(score / 10)}</div>
        <div className="gameover">{isLost ? 'Game Over' : ''}</div>
      </div>
    </div>
  )
}

Game.defaultProps = {
  isLost: false,
  setIsLost: null,
}

Game.propTypes = {
  isLost: PropTypes.bool,
  setIsLost: PropTypes.func,
}

export default Game

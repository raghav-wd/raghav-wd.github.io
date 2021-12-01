import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './game.css'

const Game = ({ isLost, setIsLost }) => {
  const [score, setScore] = useState(0)
  let scoreBoardTimer = setTimeout(() => {
    if (!isLost) setScore(score + 1)
  }, 100)

  useEffect(() => {
    clearTimeout(scoreBoardTimer)
    scoreBoardTimer = 0
  }, [isLost])

  useEffect(() => {
    setIsLost(false)
    return () => setIsLost(false)
  }, [])

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

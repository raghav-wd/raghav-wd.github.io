import { useEffect, useState } from 'react/cjs/react.development'

// eslint-disable-next-line react/prop-types
const Game = ({ isLost, setIsLost }) => {
  const [score, setScore] = useState(0)
  let scoreBoardTimer = setTimeout(() => {
    if (!isLost) setScore(score + 1)
  }, 100)

  useEffect(() => {
    console.log('Score: ', score)
    clearTimeout(scoreBoardTimer)
    scoreBoardTimer = 0
  }, [isLost])

  useEffect(() => {
    setIsLost(false)
    return () => setIsLost(false)
  }, [])

  return (
    <div className="about-page-container">
      <div className="page">
        <div>Score: {score / 10}</div>
        <div>{isLost ? 'Try again' : ''}</div>
      </div>
    </div>
  )
}
export default Game

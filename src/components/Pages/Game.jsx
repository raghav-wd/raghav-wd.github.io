import { useEffect, useState } from 'react/cjs/react.development'

// eslint-disable-next-line react/prop-types
const Game = ({ isLost }) => {
  const [score, setScore] = useState(0)
  setTimeout(() => {
    setScore(score + 1)
  }, 100)

  return (
    <div className="about-page-container">
      <div className="page">
        <div>Score: {score / 10}</div>
        <div>Progess: {isLost ? 'Lost' : 'keep'}</div>
      </div>
    </div>
  )
}
export default Game

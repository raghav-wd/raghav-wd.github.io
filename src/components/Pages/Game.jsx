import { useEffect, useState } from 'react/cjs/react.development'

const Game = () => {
  const [score, setScore] = useState(0)
  setTimeout(() => {
    setScore(score + 1)
  }, 100)

  return (
    <div className="about-page-container">
      <div className="page">Score: {score / 10}</div>
    </div>
  )
}
export default Game

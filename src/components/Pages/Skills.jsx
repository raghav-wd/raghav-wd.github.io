import { animated, useSpring } from 'react-spring'
// eslint-disable-next-line react/prop-types
const Skills = ({ page }) => {
  const anime = useSpring({
    from: { opacity: 0, transform: 'translateX(-20px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
  })
  return (
    <div className="page-container">
      <div className="page">
        <animated.div className="jumbo" style={anime}>
          Skills
        </animated.div>
        <animated.div className="featured-text">
          Things I&apos;m good at!
        </animated.div>
      </div>
    </div>
  )
}

export default Skills

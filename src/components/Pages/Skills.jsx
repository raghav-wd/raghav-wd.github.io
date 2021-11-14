import React from 'react'
import { animated, useSpring, useTrail } from 'react-spring'
import './pages.css'
// eslint-disable-next-line react/prop-types
const Skills = ({ page }) => {
  // eslint-disable-next-line react/prop-types
  const Trail = ({ children }) => {
    const items = React.Children.toArray(children)
    console.log(items)
    const trail = useTrail(items.length, {
      config: { mass: 5, tension: 2000, friction: 200 },
      opacity: 1,
      x: 0,
      from: {
        opacity: 0,
        x: 20,
      },
    })
    return (
      <div>
        {trail.map(({ height, ...style }, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <animated.div key={index} style={style} className="trailsText">
            <animated.div style={{ height }}>{items[index]}</animated.div>
          </animated.div>
        ))}
      </div>
    )
  }

  const anime = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    // config: { duration: 400 },
  })
  const anime2 = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 400 },
  })
  return (
    <div className="page-container">
      <div className="page">
        <div className="container">
          <Trail>
            <div className="jumbo">Skillset</div>
            <div className="featured-text">Know what I love to do</div>
            <div>
              <ul>
                <li>React.js</li>
                <li>Python & Java</li>
                <li>Android Devlopment (Java)</li>
                <li>Java, Javascript, C++, PHP, MySQL</li>
                <li>React Native, Three.js/react-three/fiber, GraphQL</li>
              </ul>
            </div>
          </Trail>
        </div>
      </div>
    </div>
  )
}

export default Skills

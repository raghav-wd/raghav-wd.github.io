import React from 'react'
import { animated, useTrail } from 'react-spring'

const About = () => {
  // eslint-disable-next-line react/prop-types
  const Trail = ({ children }) => {
    const items = React.Children.toArray(children)
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

  return (
    <div className="about-page-container">
      <div className="page">
        <div className="container">
          <Trail>
            <div className="jumbo">Devansh Gupta</div>
            <div className="featured-text">Coder | Developer</div>
            <div>
              <ul>
                <li>
                  Went to SRM Institute of Science and Technology - Apr&apos;18
                </li>
                <li>Front-end Intern @Advertyzement - Jun&apos;21</li>
                <li>
                  Trainee in Robotic Process Automation @State Street -
                  Jan&apos;22
                </li>
              </ul>
            </div>
            <div className="jumbo-2">Connect</div>
            {/* <div className="featured-text">Gambare</div> */}
            <div>
              Github: <a href="https://github.com/raghav-wd">raghav-wd</a>
            </div>
            <div>
              LeetCode: <a href="https://leetcode.com/raghav-wd/">raghav-wd</a>
            </div>
            <div>
              LinkedIn:{' '}
              <a href="https://www.linkedin.com/in/devanshgupta-/">
                Devansh Gupta
              </a>
            </div>
            <div>
              Sketchfab: <a href="https://sketchfab.com/raghav-wd">raghav-wd</a>
            </div>
            <br />
            <div>Phone no: +91 6387658003</div>
            <div>Email: raghav.gupta.gpt@gmail.com</div>
          </Trail>
        </div>
      </div>
    </div>
  )
}

export default About

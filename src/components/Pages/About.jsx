import React from 'react'
import { animated, useSpring, useTrail } from 'react-spring'
// eslint-disable-next-line react/prop-types
const About = ({ page }) => {
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
    <div className="about-page-container">
      <div className="page">
        <div className="container">
          <Trail>
            <div className="jumbo">Devansh Gupta</div>
            <div className="featured-text">Education and Projects...</div>
            <div>
              <ul>
                <li>
                  Went to SRM Institute of Science and Technology - Apr&apos;18
                </li>
                <li>Front-end Inter @Advertyzement - Jun&apos;21</li>
                <li>AI Developer @State Street - Jan&apos;22</li>
              </ul>
            </div>
            <div className="jumbo-2">Projects</div>
            <div className="featured-text">A peek on my works</div>
            <div className="card-container">
              <div className="card">
                <h1 className="title">Skima</h1>
                <p className="text">
                  Revamped college&apos;s academic website to a more UI
                  intensive and analytical PW. Available as an installable web
                  app on android, ios, windows and macOS.
                </p>
                <div className="label">React.js</div>
                <div className="label">Material</div>
              </div>
              <div className="card">
                <h1 className="title">Musifire</h1>
                <p className="text">
                  Musicplayer app on android devices, smoothly fetches
                  lyrics/track info/album art and saves it.
                </p>
                <div className="label">Android</div>
                <div className="label">Php</div>
              </div>
            </div>
            <div className="card-container">
              <div className="card">
                <h1 className="title">FoodDude</h1>
                <p className="text">
                  A mini-startup, I invented when I came across a problem during
                  my first year in my college hostel. As I was used to being
                  sleeping late at night, I always had to deal with the urge of
                  eating snacks at night but our hostel didn&apos;t have any
                  facility of canteen at night. So I took it upon me to run an
                  experiment to start a wholesome business. The main idea was to
                  develop a software to manage sales of the snacks.
                </p>
                <div className="label">Android</div>
                <div className="label">Php</div>
              </div>
            </div>
          </Trail>
        </div>
      </div>
    </div>
  )
}

export default About

import About from './About'
import Game from './Game'
import Skills from './Skills'
import './pages.css'
// eslint-disable-next-line react/prop-types
const Pages = ({ page, isLost, setIsLost }) => (
  <div className="Pages">
    {page === 'skills' ? <Skills page={page} /> : null}
    {page === 'about' ? <About page={page} /> : null}
    {page === 'game' ? (
      <Game page={page} isLost={isLost} setIsLost={setIsLost} />
    ) : null}
  </div>
)

export default Pages

import Skills from './Skills'
import About from './About'
import './pages.css'
// eslint-disable-next-line react/prop-types
const Pages = ({ page }) => (
  <div className="Pages">
    {page === 'skills' ? <Skills page={page} /> : null}
    {page === 'about' ? <About page={page} /> : null}
  </div>
)

export default Pages

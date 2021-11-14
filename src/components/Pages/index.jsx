import Skills from './Skills'
import './pages.css'
// eslint-disable-next-line react/prop-types
const Pages = ({ page }) => (
  <div className="Pages">
    {page === 'skills' ? <Skills page={page} /> : null}
  </div>
)

export default Pages

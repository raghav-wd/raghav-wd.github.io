import Skills from './Skills'
import './pages.css'
// eslint-disable-next-line react/prop-types
const Pages = ({ page }) => (
  <div className="Pages">
    <Skills page={page} />
  </div>
)

export default Pages
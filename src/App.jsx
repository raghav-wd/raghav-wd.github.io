import './App.css'
import { useEffect, useState } from 'react'
import ControlsGuide from './components/ui/ControlsGuide'
import Stage from './components/Stage'
import AnalogControl from './components/ui/AnalogControl'

function App() {
  const [width, setWidth] = useState(window.innerWidth)

  function handleWindowSizeChange() {
    setWidth(window.innerWidth)
  }
  useEffect(() => {
    document.documentElement.webkitRequestFullscreen()
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

  return (
    <div className="App">
      <Stage />
      {width <= 768 && <AnalogControl />}
      {width > 768 && <ControlsGuide />}
    </div>
  )
}

export default App

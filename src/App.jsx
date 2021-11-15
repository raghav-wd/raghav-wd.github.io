import './App.css'
import { useState } from 'react'
import ControlsGuide from './components/ui/ControlsGuide'
import Stage from './components/Stage'

function App() {
  const [activeControlIntroduction, setActiveControlIntroduction] =
    useState(true)

  return (
    <div className="App">
      <Stage />
      {activeControlIntroduction ? (
        <ControlsGuide
          activeControlIntroduction={activeControlIntroduction}
          setActiveControlIntroduction={setActiveControlIntroduction}
        />
      ) : null}
    </div>
  )
}

export default App

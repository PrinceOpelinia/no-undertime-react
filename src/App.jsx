import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import '../src/styles/card.css'
import Timer from './components/Timer';
function App() {

  return (
    <>
   
    <div className='card'>
    <Timer/>       
    </div>
   
    </>
  )
}

export default App
import React, { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [time, setTime] = useState(1500)
  const [change, setChange] = useState(false)

  useEffect(() => {
    if (change) {
      const interval = setInterval(() => {
        setTime((prev) => prev - 1)
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [change])

  function handleTimeStart() {
    setChange(true)
  }

  function handleResetTime() {
    setTime(1500)
    setChange(false)
  }

  let seconds = time % 60
  let minutes = Math.floor(time / 60)

  return (
    <div className='container'>
      <div className="btns">
        <button>Pomodoro</button>
        <button>Short Break</button>
        <button>Long Break</button>
      </div>

      <h1>{minutes}:{seconds < 10 ? "0" : ""}{seconds}</h1>

      <div className="buttons">
        <button onClick={handleTimeStart} className='btn'>Start</button>
        <button onClick={handleResetTime} className='btn'>Reset</button>
      </div>
    </div>
  )
}

export default App
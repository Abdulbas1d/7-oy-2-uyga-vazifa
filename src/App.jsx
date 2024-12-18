import React, { useEffect, useState } from 'react';
import './App.css';
import TimeEnd from './assets/audio/time-end.m4a';

function App() {
  const [time, setTime] = useState(1500);
  const [start, setStart] = useState(false);
  const [selectedMode, setSelectedMode] = useState('pomodoro');
  const [audioPlaying, setAudioPlaying] = useState(false);

  useEffect(() => {
    if (start) {
      const interval = setInterval(() => {
        setTime((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setStart(false);
            handleAudioPlay();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [start]);

  function handleTimeToggle() {
    setStart((prev) => !prev);
  }

  function handleResetTime() {
    setTime(1500);
    setStart(false);
    setAudioPlaying(false);
  }

  function handleModeChange(mode) {
    setSelectedMode(mode);
    setTime(mode === 'pomodoro' ? 1500 : mode === 'shortBreak' ? 300 : 900);
    setStart(false);
    setAudioPlaying(false);
  }

  function handleAudioPlay() {
    const audio = new Audio(TimeEnd); 
    setAudioPlaying(true);
    audio.play();
    audio.onended = () => setAudioPlaying(false); 
  }

  let seconds = time % 60;
  let minutes = Math.floor(time / 60);

  return (
    <div className='container'>
      <div className="btns">
        <button className='pomodoro' style={{ backgroundColor: selectedMode === 'pomodoro' ? '#A44E4E' : '' }} onClick={() => handleModeChange('pomodoro')}>Pomodoro</button>
        <button className='shortBreak' style={{ backgroundColor: selectedMode === 'shortBreak' ? '#A44E4E' : '' }} onClick={() => handleModeChange('shortBreak')}>Short Break</button>
        <button className='longBreak' style={{ backgroundColor: selectedMode === 'longBreak' ? '#A44E4E' : '' }} onClick={() => handleModeChange('longBreak')}>Long Break</button>
      </div>

      <h1>{minutes}:{seconds < 10 ? '0' : ''}{seconds}</h1>

      <div className="buttons">
        <button onClick={handleTimeToggle} className='btn'>{start ? 'Stop' : 'Start'}</button>
        <button onClick={handleResetTime} className='btn'>Reset</button>
      </div>
    </div>
  );
}

export default App;
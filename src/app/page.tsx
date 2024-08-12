'use client'
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';

const drumPads = [
  { key: 'Q', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3', name: 'Heater 1' },
  { key: 'W', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3', name: 'Heater 2' },
  { key: 'E', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3', name: 'Heater 3' },
  { key: 'A', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3', name: 'Heater 4' },
  { key: 'S', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3', name: 'Clap' },
  { key: 'D', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3', name: 'Open-HH' },
  { key: 'Z', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3', name: 'Kick-n\'-Hat' },
  { key: 'X', audio: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3', name: 'Kick' },
  { key: 'C', audio: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3', name: 'Closed-HH' },
];

export default function DrumMachine() {
  const [displayText, setDisplayText] = useState('');
  const [power, setPower] = useState(true);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (power) {
        const pad = drumPads.find(p => p.key === event.key.toUpperCase());
        if (pad) {
          playSound(pad.audio, pad.name);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [power, volume]);

  const playSound = (audio: string, name: string) => {
    const sound = new Audio(audio);
    sound.volume = volume;
    sound.play();
    setDisplayText(name);
  };

  return (
    <div className={styles.container}>
      <div id="drum-machine" className={styles.drumMachine}>
        <div className={styles.controls}>
          <button
            className={`${styles.powerButton} ${power ? styles.on : styles.off}`}
            onClick={() => setPower(!power)}
          >
            {power ? 'ON' : 'OFF'}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className={styles.volumeControl}
          />
        </div>
        <div id="display" className={styles.display}>{displayText}</div>
        <div className={styles.padGrid}>
          {drumPads.map((pad) => (
            <button
              key={pad.key}
              className={`${styles.drumPad} drum-pad`}
              id={pad.name.replace(/\s+/g, '-')}
              onClick={() => power && playSound(pad.audio, pad.name)}
            >
              {pad.key}
              <audio className="clip" id={pad.key} src={pad.audio}></audio>
            </button>
          ))}
        </div>
      </div>
      <footer className={styles.footer}>
        Created by <a href="https://github.com/wweziza" target="_blank" rel="noopener noreferrer">weziza</a>
      </footer>
    </div>
  );
}

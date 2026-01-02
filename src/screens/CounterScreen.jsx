import React, { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

const CounterScreen = ({ navigateToHome }) => {
  const [time, setTime] = useState(0);
  const [kicks, setKicks] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      if (isActive) setTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [isActive, startTime]);

  const saveSession = async () => {
    const minutes = Math.floor(time / 60);
    await storage.saveSession({
      id: Date.now().toString(),
      date: new Date().toISOString(),
      timeTaken: minutes,
      kicks: 10
    });
    navigateToHome();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      padding: 20,
      display: 'flex', flexDirection: 'column', justifyContent: 'center'
    }}>
      <div style={{
        maxWidth: 400, margin: '0 auto',
        background: 'white', borderRadius: 25,
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)', padding: 40, textAlign: 'center'
      }}>
        <h1 style={{ fontSize: 36, color: '#333', marginBottom: 30 }}>Kick Counter</h1>
        
        <div style={{
          fontSize: 64, fontWeight: 'bold', color: '#4CAF50',
          background: '#e8f5e8', borderRadius: 20,
          padding: '20px 40px', margin: 30
        }}>
          {kicks}/10 ⚽
        </div>
        
        <div style={{
          fontSize: 48, color: '#FF9800',
          marginBottom: 40
        }}>
          {formatTime(time)}
        </div>

        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setKicks(Math.min(kicks + 1, 10))}
            disabled={!isActive}
            style={{
              background: '#4CAF50', color: 'white', border: 'none',
              padding: '15px 30px', borderRadius: 25, fontSize: 18,
              fontWeight: 'bold', cursor: isActive ? 'pointer' : 'not-allowed',
              minWidth: 120
            }}
          >
            + Kick
          </button>
          
          <button 
            onClick={saveSession}
            disabled={kicks < 10}
            style={{
              background: kicks >= 10 ? '#4CAF50' : '#ccc',
              color: 'white', border: 'none',
              padding: '15px 30px', borderRadius: 25, fontSize: 18,
              fontWeight: 'bold', cursor: kicks >= 10 ? 'pointer' : 'not-allowed',
              minWidth: 120
            }}
          >
            ✅ Save
          </button>
          
          <button 
            onClick={navigateToHome}
            style={{
              background: 'transparent', color: '#666',
              border: '2px solid #ddd', padding: '13px 28px',
              borderRadius: 25, fontSize: 18, cursor: 'pointer'
            }}
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default CounterScreen;

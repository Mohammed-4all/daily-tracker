import React, { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

const HomeScreen = ({ navigateToCounter }) => {
  const [sessions, setSessions] = useState([]);
  const [showInfo, setShowInfo] = useState(false);

  const loadSessions = async () => {
    const data = await storage.getSessions();
    setSessions(data);
  };

  useEffect(() => {
    loadSessions();
    const interval = setInterval(loadSessions, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      padding: 20,
      fontFamily: '-apple-system, Arial, sans-serif'
    }}>
      {/* Main Card */}
      <div style={{
        maxWidth: 500, margin: '0 auto',
        background: 'white', borderRadius: 25,
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)', overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
          padding: 30, position: 'relative'
        }}>
          <div style={{ textAlign: 'left', paddingRight: 80 }}>
            <h1 style={{ margin: '0 0 8px', fontSize: 32, color: '#333', fontWeight: 'bold' }}>
              ⚽ DFM Kick Counter
            </h1>
            <p style={{ margin: 0, color: '#666', fontSize: 16 }}>
              Tracking baby's 10 movements daily
            </p>
          </div>
          <div style={{
            position: 'absolute', top: 38, right: 18,
            width: 38, height: 38, borderRadius: '50%',
            background: 'rgba(255,255,255,0.9)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', boxShadow: '0 3px 10px rgba(0,0,0,0.15)'
          }} onClick={() => setShowInfo(true)}>
            <span style={{ fontSize: 18 }}>ℹ️</span>
          </div>
        </div>

        {/* Sessions List */}
        <div style={{ padding: 30, minHeight: 400 }}>
          {sessions.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#999' }}>
              <div style={{ fontSize: 64, marginBottom: 20 }}>⚽</div>
              <h3>No sessions yet</h3>
              <p>Start your first kick count today!</p>
            </div>
          ) : (
            sessions.map((session, i) => (
              <div key={session.id} style={{
                background: i % 2 ? '#f8f9ff' : '#fff5f8',
                padding: 25, marginBottom: 15, borderRadius: 20,
                borderLeft: '5px solid #4CAF50'
              }}>
                <div style={{ fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 8 }}>
                  {new Date(session.date).toLocaleString('en-IN')}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 15, color: '#4CAF50', fontSize: 18 }}>
                  <span>⏱️ {session.timeTaken} min</span>
                  <span style={{ background: '#4CAF50', color: 'white', padding: '8px 16px', borderRadius: 20, fontSize: 14 }}>
                    ✅ 10/10 Kicks
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Start Button */}
        <div style={{ padding: '0 30px 30px', textAlign: 'center' }}>
          <button 
            onClick={navigateToCounter}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white', border: 'none', padding: '18px 60px',
              borderRadius: 30, fontSize: 18, fontWeight: 'bold',
              boxShadow: '0 10px 30px rgba(102,126,234,0.4)', cursor: 'pointer',
              width: '100%'
            }}
          >
            ➕ Start New Kick Count
          </button>
        </div>
      </div>

      {/* Info Modal - Figma Content */}
      {showInfo && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'flex-end', zIndex: 1000
        }} onClick={() => setShowInfo(false)}>
          <div style={{
            width: '100%', maxWidth: 500, background: 'white',
            borderTopLeftRadius: 25, borderTopRightRadius: 25,
            maxHeight: '70%', overflow: 'auto', boxShadow: '0 -10px 40px rgba(0,0,0,0.2)'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ height: 4, width: 40, background: '#ddd', borderRadius: 2, margin: '20px auto' }} />
            <div style={{ padding: '0 30px 30px' }}>
              <h2 style={{ textAlign: 'center', color: '#333', marginBottom: 20, fontSize: 24 }}>
                ⚽ How to Count DFM Kicks
              </h2>
              <div style={{ lineHeight: 1.6, color: '#555', fontSize: 16 }}>
                <div style={{ background: '#f0f8ff', padding: 20, borderRadius: 15, borderLeft: '4px solid #4CAF50', marginBottom: 20 }}>
                  <h3 style={{ margin: '0 0 15px', color: '#333' }}>📋 Instructions:</h3>
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    <li>✅ Start after meals</li>
                    <li>⏰ Lie down quietly</li>
                    <li>⚽ Count ALL movements</li>
                    <li>🎯 Stop at 10 kicks</li>
                    <li>💾 Save time taken</li>
                  </ul>
                </div>
                <div style={{ background: '#fff3cd', padding: 20, borderRadius: 15, borderLeft: '4px solid #ffc107' }}>
                  <h3 style={{ margin: '0 0 15px', color: '#856404' }}>⚠️ Alert:</h3>
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    <li>&lt;10 kicks in 2hrs → Call doctor</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;

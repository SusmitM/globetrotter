import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const username = searchParams.get('username') || 'friend';
  
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(to right bottom, #2563EB, #3B82F6)',
          fontSize: 32,
          fontWeight: 'bold',
          color: 'white',
          padding: '40px 20px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 50, marginBottom: 20 }}>Globetrotter Challenge</div>
        <div style={{ fontSize: 30, marginBottom: 40 }}>
          Play with <span style={{ fontWeight: 'bold', fontSize: 40 }}>{username}</span>
        </div>
        <div 
          style={{ 
            background: 'rgba(255,255,255,0.2)', 
            padding: '12px 24px', 
            borderRadius: 12,
            marginTop: 20,
          }}
        >
          Click to join now
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
} 
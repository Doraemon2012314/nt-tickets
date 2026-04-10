import { signIn, signOut, useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>Ticket Bot Dashboard</h1>
      {!session ? (
        <>
          <p>Please log in to manage your tickets.</p>
          <button 
            onClick={() => signIn('discord')}
            style={{ padding: '10px 20px', backgroundColor: '#5865F2', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Login with Discord
          </button>
        </>
      ) : (
        <>
          <p>Welcome, {session.user.name}!</p>
          <button 
            onClick={() => signOut()}
            style={{ padding: '10px 20px', backgroundColor: '#ed4245', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Logout
          </button>
          <div style={{ marginTop: '20px' }}>
             <a href="/dashboard" style={{ color: '#5865F2' }}>Go to Guild Settings</a>
          </div>
        </>
      )}
    </div>
  );
}

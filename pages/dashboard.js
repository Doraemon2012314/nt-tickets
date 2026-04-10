import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const { data: session } = useSession();
  const [guilds, setGuilds] = useState([]);

  useEffect(() => {
    if (session) {
      fetch('/api/guilds')
        .then((res) => res.json())
        .then((data) => setGuilds(data));
    }
  }, [session]);

  if (!session) return <p>Access Denied. Please login first.</p>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Your Servers</h1>
      <div style={{ display: 'grid', gap: '10px' }}>
        {guilds.map((guild) => (
          <div key={guild.id} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '8px' }}>
            {guild.name}
            <button style={{ float: 'right' }}>Configure</button>
          </div>
        ))}
      </div>
    </div>
  );
}

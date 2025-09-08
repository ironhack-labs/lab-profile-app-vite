import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div style={{ padding: 24 }}>
      <h1>IronProfile</h1>
      <p>Today we are creating some app with authorization.</p>
      <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
        <Link to="/signup"><button>Sign up</button></Link>
        <Link to="/login"><button>Log in</button></Link>
      </div>
    </div>
  )
}

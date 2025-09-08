import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { AuthContext } from '../context/auth.context.jsx'

export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()

  // get helper functions from context
  const { storeToken, authenticateUser } = useContext(AuthContext)

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const { data } = await api.post('/auth/login', form) // -> { authToken }
      storeToken(data.authToken)
      await authenticateUser() // loads current user and sets isLoggedIn
      navigate('/')            // go Home on success
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div style={{ padding: 24, maxWidth: 440 }}>
      <h2>Log in</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 10 }}>
        <label>
          Username
          <input name="username" value={form.username} onChange={handleChange} required />
        </label>
        <label>
          Password
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </label>
        <button type="submit" disabled={saving}>
          {saving ? 'Logging in…' : 'Log in'}
        </button>
      </form>
      {error && <p style={{ color: 'red', marginTop: 8 }}>{error}</p>}
    </div>
  )
}
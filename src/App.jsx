import { useState } from 'react'
import ProfileForm from './ProfileForm'

export default function App() {
  const [profile, setProfile] = useState(() => {
    try { return JSON.parse(localStorage.getItem('profile')) } catch { return null }
  })

  function handleSave(p) {
    localStorage.setItem('profile', JSON.stringify(p))
    setProfile(p)
  }

  function switchProfile() {
    localStorage.removeItem('profile')
    setProfile(null)
  }

  if (!profile) return <ProfileForm onSave={handleSave} />

  return (
    <div style={{ padding: 20 }}>
      <h1>CampusHub</h1>
      <p>Welcome, {profile.name} (Year {profile.year}, {profile.branch}, {profile.role})</p>
      <button onClick={switchProfile}>Switch profile</button>
    </div>
  )
}

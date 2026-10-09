import { useState } from 'react'
import { supabase } from './supabaseClient'

const BRANCHES = ['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL', 'IT', 'AI&DS']

export default function ProfileForm({ onSave }) {
  const [name, setName] = useState('')
  const [year, setYear] = useState(1)
  const [branch, setBranch] = useState('CSE')
  const [role, setRole] = useState('student')
  const [error, setError] = useState('')

  async function handleSubmit() {
    if (!name.trim()) return setError('Please enter your name')
    const profile = { name: name.trim(), year: Number(year), branch, role }
    const { error } = await supabase.from('profiles').insert(profile)
    if (error) return setError('Error: ' + error.message)
    onSave(profile)
  }

  return (
    <div style={{ maxWidth: 360, margin: '40px auto', display: 'grid', gap: 12 }}>
      <h1>Welcome to CampusHub</h1>
      <input placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
      <select value={year} onChange={e => setYear(e.target.value)}>
        {[1, 2, 3, 4].map(y => <option key={y} value={y}>Year {y}</option>)}
      </select>
      <select value={branch} onChange={e => setBranch(e.target.value)}>
        {BRANCHES.map(b => <option key={b}>{b}</option>)}
      </select>
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="student">Student</option>
        <option value="senior">Senior</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleSubmit}>Continue</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

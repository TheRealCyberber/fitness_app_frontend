import { useState } from 'react'
import { AddProgress } from '../../services/progress'

const ProgressForm = ({ onAdd }) => {
  const [date, setDate] = useState('')
  const [weight, setWeight] = useState('')
  const [latestChange, setLatestChange] = useState('')
  const [notes, setNotes] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!date || !weight || !latestChange) return
    try {
      const newEntry = await AddProgress({ date, weight, latestChange, notes })
      onAdd && onAdd(newEntry)
      setDate('')
      setWeight('')
      setLatestChange('')
      setNotes('')
    } catch (err) {
      alert('Failed to add progress')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Progress</h3>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="number"
        placeholder="Current Weight"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <input
        type="number"
        placeholder="Latest Change"
        value={latestChange}
        onChange={(e) => setLatestChange(e.target.value)}
      />
      <input
        type="text"
        placeholder="Notes (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  )
}

export default ProgressForm
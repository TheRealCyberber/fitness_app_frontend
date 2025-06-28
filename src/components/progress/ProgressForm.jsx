import { useState } from 'react'
import { AddProgress } from '../../services/progress'

const ProgressForm = ({ onAdd }) => {
  const [date, setDate] = useState('')
  const [value, setValue] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!date || !value) return
    try {
      const newEntry = await AddProgress({ date, value })
      onAdd && onAdd(newEntry)
      setDate('')
      setValue('')
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
        placeholder="Value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  )
}

export default ProgressForm
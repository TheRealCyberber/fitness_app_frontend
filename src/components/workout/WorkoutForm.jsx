import { useState } from 'react'
import { AddWorkout } from '../../services/workout'

const WorkoutForm = ({ onAdd }) => {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !date) return
    try {
      const newWorkout = await AddWorkout({ name, date })
      onAdd && onAdd(newWorkout)
      setName('')
      setDate('')
    } catch (err) {
      alert('Failed to add workout')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Workout</h3>
      <input
        type="text"
        placeholder="Workout Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  )
}

export default WorkoutForm
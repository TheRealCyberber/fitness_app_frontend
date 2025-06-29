import { useState } from 'react'
import { AddWorkout } from '../../services/workout'


const WorkoutForm = ({ onAdd }) => {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [type, setType] = useState('')
  const [duration, setDuration] = useState('')
  const [calories, setCalories] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !date || !type || !duration || !calories) return
    try {
      const newWorkout = await AddWorkout({ name, date, type,
        duration: Number(duration),
        calories: Number(calories) })
      onAdd && onAdd(newWorkout)
      setName('')
      setDate('')
      setType('')
      setDuration('')
      setCalories('')
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
      <input
        type="text"
        placeholder="Workout Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />
      <input
        type="number"
        placeholder="Duration (minutes)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
      <input
        type="number"
        placeholder="Calories burned"
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  )
}

export default WorkoutForm
import { useEffect, useState } from 'react'
import { GetWorkouts, DeleteWorkout, UpdateWorkout } from '../../services/workout'
import WorkoutForm from './WorkoutForm'

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editName, setEditName] = useState('')
  const [editDate, setEditDate] = useState('')

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const data = await GetWorkouts()
        setWorkouts(data)
      } catch (err) {
        setError('Failed to load workouts')
      } finally {
        setLoading(false)
      }
    }
    fetchWorkouts()
  }, [])

  const handleAddWorkout = (workout) => {
    setWorkouts((prev) => [...prev, workout])
  }

  const handleDelete = async (id) => {
    try {
      await DeleteWorkout(id)
      setWorkouts((prev) => prev.filter((w) => (w.id || w._id) !== id))
    } catch (err) {
      alert('Failed to delete workout')
    }
  }

   
    const handleEdit = (workout) => {
      setEditingId(workout.id || workout._id)
      setEditName(workout.name)
      setEditDate(workout.date)
    }
  
 
    const handleEditSubmit = async (e) => {
      e.preventDefault()
      try {
        const updatedWorkout = await UpdateWorkout(editingId, { name: editName, date: editDate })
        setWorkouts((prev) =>
          prev.map((w) =>
            (w.id || w._id) === editingId ? updatedWorkout : w
          )
        )
        setEditingId(null)
        setEditName('')
        setEditDate('')
      } catch (err) {
        alert('Failed to update workout')
      }
    }
  
    
    const handleCancelEdit = () => {
      setEditingId(null)
      setEditName('')
      setEditDate('')
    }

  return (
    <div>
    <h2>My Workouts</h2>
    {!editingId && <WorkoutForm onAdd={handleAddWorkout} />}
    {editingId && (
      <form onSubmit={handleEditSubmit}>
        <h3>Edit Workout</h3>
        <input
          type="text"
          placeholder="Workout Name"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
        />
        <input
          type="date"
          value={editDate}
          onChange={(e) => setEditDate(e.target.value)}
        />
        <button type="submit">Update</button>
        <button type="button" onClick={handleCancelEdit}>Cancel</button>
      </form>
    )}
    {loading && <p>Loading...</p>}
    {error && <p>{error}</p>}
    <ul>
      {workouts.map((workout) => (
        <li key={workout.id || workout._id}>
          {workout.name} - {workout.date}
          <button onClick={() => handleEdit(workout)}>Edit</button>
          <button onClick={() => handleDelete(workout.id || workout._id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  </div>
  )
}

export default WorkoutList
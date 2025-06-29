import { useEffect, useState } from 'react'
import { GetWorkouts, AddWorkout, DeleteWorkout, UpdateWorkout } from '../../services/workout' 
import WorkoutForm from './WorkoutForm'

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingValues, setEditingValues] = useState({ 
    name: '',
    date: '',
    type: '',
    duration: '',
    calories: ''
  })

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

  const handleAddWorkout = async (values) => { 
    try {
      const newWorkout = await AddWorkout(values) 
      setWorkouts((prev) => [...prev, newWorkout])
    } catch {
      alert('Failed to add workout')
    }
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
    setEditingValues({
      name: workout.name,
      date: workout.date,
      type: workout.type || '',
      duration: workout.duration || '',
      calories: workout.calories || ''
    })
  }


  const handleEditSubmit = async (values) => { 
    try {
      const updatedWorkout = await UpdateWorkout(editingId, values) 
      setWorkouts((prev) =>
        prev.map((w) =>
          (w.id || w._id) === editingId ? updatedWorkout : w
        )
      )
      setEditingId(null)
      setEditingValues({
        name: '',
        date: '',
        type: '',
        duration: '',
        calories: ''
      })
    } catch (err) {
      alert('Failed to update workout')
    }
  }

  const handleCancelEdit = () => { 
    setEditingId(null)
    setEditingValues({
      name: '',
      date: '',
      type: '',
      duration: '',
      calories: ''
    })
  }

  return (
    <div>
      <h2>My Workouts</h2>
      {!editingId && (
        <WorkoutForm onSubmit={handleAddWorkout} /> 
      )}
      {editingId && (
        <div>
          <WorkoutForm
            onSubmit={handleEditSubmit} 
            initialValues={editingValues} 
            submitLabel="Update" 
          />
          <button type="button" onClick={handleCancelEdit}>Cancel</button>
        </div>
      )}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {workouts.map((workout) => (
          <li key={workout.id || workout._id}>
            {new Date(workout.date).toLocaleDateString()}  Name: {workout.name}, Type: {workout.type}, Duration: {workout.duration}, Calories Burned: {workout.calories}
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
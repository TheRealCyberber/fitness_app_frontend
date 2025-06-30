import { useState, useEffect } from 'react'

const predefinedWorkouts = [
  { name: 'Running', type: 'Cardio', duration: 30, calories: 300 },
  { name: 'Cycling', type: 'Cardio', duration: 45, calories: 400 },
  { name: 'Weight Lifting', type: 'Strength', duration: 40, calories: 250 },
  { name: 'Yoga', type: 'Flexibility', duration: 60, calories: 200 }
]


const WorkoutForm = ({
  onSubmit, 
  initialValues = { name: '', date: '', type: '', duration: '', calories: '' },
  submitLabel = 'Add' 
}) => {
  const [name, setName] = useState(initialValues.name) 
  const [date, setDate] = useState(initialValues.date) 
  const [type, setType] = useState(initialValues.type) 
  const [duration, setDuration] = useState(initialValues.duration) 
  const [calories, setCalories] = useState(initialValues.calories) 


  useEffect(() => {
    setName(initialValues.name)
    setDate(initialValues.date)
    setType(initialValues.type)
    setDuration(initialValues.duration)
    setCalories(initialValues.calories)
  }, []) 

  const handlePresetChange = (e) => {
    const selectedName = e.target.value
    const selected = predefinedWorkouts.find((w) => w.name === selectedName)
    
    if (selected) {
      setName(selected.name)
      setType(selected.type)
      setDuration(selected.duration.toString())
      setCalories(selected.calories.toString())
    } else {
      setName('')
      setType('')
      setDuration('')
      setCalories('')
      setDate('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !date || !type || !duration || !calories) return
    await onSubmit({ 
      name,
      date,
      type,
      duration: Number(duration),
      calories: Number(calories)
    })
    if (submitLabel === 'Add') { 
      setName('')
      setDate('')
      setType('')
      setDuration('')
      setCalories('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>{submitLabel} Workout</h3> 

      <select value={name} onChange={handlePresetChange}>
      <option value="">Select a workout or type below</option>
      {predefinedWorkouts.map((workout) => (
      <option key={workout.name} value={workout.name}> {workout.name} </option>
      ))}
      </select>

      <input
        type="text"
        placeholder="Workout Name"
        value={name}
        onChange={(e) => {
          console.log(e.target.value)
          setName(e.target.value)}}
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
      <button type="submit">{submitLabel}</button> 
    </form>
  )
}

export default WorkoutForm
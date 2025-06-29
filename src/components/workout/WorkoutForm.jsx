import { useState, useEffect } from 'react'

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
  }, [initialValues]) 

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
      <button type="submit">{submitLabel}</button> 
    </form>
  )
}

export default WorkoutForm
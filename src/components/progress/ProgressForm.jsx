import { useState, useEffect } from 'react'

/* const ProgressForm = ({ onAdd }) => {
  const [date, setDate] = useState('')
  const [weight, setWeight] = useState('')
  const [latestChange, setLatestChange] = useState('')
  const [notes, setNotes] = useState('') */

  const ProgressForm = ({
    onSubmit, 
    initialValues = { date: '', weight: '', latestChange: '', notes: '' }, 
    submitLabel = 'Add' 
  }) => {
  const [date, setDate] = useState(initialValues.date) 
  const [weight, setWeight] = useState(initialValues.weight) 
  const [latestChange, setLatestChange] = useState(initialValues.latestChange) 
  const [notes, setNotes] = useState(initialValues.notes)

  useEffect(() => {
    setDate(initialValues.date)
    setWeight(initialValues.weight)
    setLatestChange(initialValues.latestChange)
    setNotes(initialValues.notes)
  }, [])

  /* const handleSubmit = async (e) => {
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
  } */

    const handleSubmit = async (e) => {
      e.preventDefault()
      if (!date || !weight || !latestChange) return
      await onSubmit({ date, weight, latestChange, notes }) 
      if (submitLabel === 'Add') { 
        setDate('')
        setWeight('')
        setLatestChange('')
        setNotes('')
      }
    }
  

  return (
    <form onSubmit={handleSubmit}>
      <h3>{submitLabel} Progress</h3>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="number"
        placeholder="Current Weight in KG"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <input
        type="number"
        placeholder="Previous Weight"
        value={latestChange}
        onChange={(e) => setLatestChange(e.target.value)}
      />
      <input
        type="text"
        placeholder="Notes (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <button type="submit">{submitLabel}</button>
    </form>
  )
}

export default ProgressForm
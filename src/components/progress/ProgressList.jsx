import ProgressForm from './ProgressForm'
import { useEffect, useState } from 'react'
import { GetProgress, AddProgress, DeleteProgress, UpdateProgress } from '../../services/progress'

const ProgressList = () => {
  const [progress, setProgress] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingValues, setEditingValues] = useState({ date: '', weight: '', latestChange: '', notes: '' }) 
  /* const [editDate, setEditDate] = useState('')
  const [editWeight, setEditWeight] = useState('')
  const [editLatestChange, setEditLatestChange] = useState('')
  const [editNotes, setEditNotes] = useState('') */

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const data = await GetProgress()
        setProgress(data)
      } catch (err) {
        setError('Failed to load progress')
      } finally {
        setLoading(false)
      }
    }
    fetchProgress()
  }, [])

  // Use ProgressForm for adding new entries
  /* const handleAdd = (newEntry) => {
    setProgress([...progress, newEntry])
  } */

    const previousWeight = progress.length > 0
    ? progress[progress.length - 1].weight
    : ''

    const handleAdd = async (values) => { 
      try {
        const newEntry = await AddProgress(values) 
        setProgress((prev) => [...prev, newEntry])
      } catch {
        alert('Failed to add progress')
      }
    }

  const handleDelete = async (id) => {
    try {
      await DeleteProgress(id)
      setProgress((prev) => prev.filter((entry) => (entry.id || entry._id) !== id))
    } catch (err) {
      alert('Failed to delete progress')
    }
  }

  const handleEdit = (entry) => {
    setEditingId(entry.id || entry._id)
    setEditingValues({
      date: entry.date,
      weight: entry.weight,
      latestChange: entry.latestChange,
      notes: entry.notes || ''
  })
}

  /* const handleEditSubmit = async (e) => {
    e.preventDefault()
    try {
      const updated = await UpdateProgress(editingId, values)
      setProgress((prev) =>
        prev.map((p) => (p.id || p._id) === editingId ? updated : p)
      )
      setEditingId(null)
      setEditingValues({ date: '', weight: '', latestChange: '', notes: '' })
    } catch {
      alert('Failed to update progress')
    }
  } */

    const handleEditSubmit = async (values) => {
      try {
        const updated = await UpdateProgress(editingId, values)
        setProgress((prev) =>
          prev.map((p) => (p.id || p._id) === editingId ? updated : p)
        )
        setEditingId(null)
        setEditingValues({ date: '', weight: '', latestChange: '', notes: '' })
      } catch {
        alert('Failed to update progress')
      }
    }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditingValues({ date: '', weight: '', latestChange: '', notes: '' })
  }

    // I added this to get the most recent progress entry only
    const latestEntry = progress.length > 0 ? progress[progress.length - 1] : null

  return (
    <div>
    <h2>My Progress</h2>
    {!editingId && (
      <ProgressForm onSubmit={handleAdd}
      previousWeight={previousWeight} 
      /> // added this
    )}
    {editingId && (
      <div>
        <ProgressForm
          onSubmit={handleEditSubmit}
          initialValues={editingValues} 
          submitLabel="Update" 
        />
        <button type="button" onClick={handleCancelEdit}>Cancel</button> 
      </div>
    )}
    {loading && <p>Loading...</p>}
    {error && <p>{error}</p>}
    {latestEntry && (
        <div>
          <h3>Latest Progress</h3>
          <p>
            Date: {new Date(latestEntry.date).toLocaleDateString()}<br />
            Current Weight: {latestEntry.weight} kg<br />
            Previous Weight: {latestEntry.latestChange} kg<br />
            Notes: {latestEntry.notes}
          </p>
          <p>
            <strong>
              {latestEntry.weight - latestEntry.latestChange < 0
                ? `You lost ${Math.abs(latestEntry.weight - latestEntry.latestChange)} kg`
                : latestEntry.weight - latestEntry.latestChange > 0
                ? `You gained ${latestEntry.weight - latestEntry.latestChange} kg`
                : 'No change in weight'}
            </strong>
          </p>
          <button onClick={() => handleEdit(latestEntry)}>Edit</button>
          <button onClick={() => handleDelete(latestEntry.id || latestEntry._id)}>Delete</button>
        </div>
      )}

    {/* <ul>
    {progress.map((entry) => {
  const diff = entry.weight - entry.latestChange
  let changeMsg = ''
  if (diff < 0) {
    changeMsg = `You lost ${Math.abs(diff)} kg`
  } else if (diff > 0) {
    changeMsg = `You gained ${diff} kg`
  } else {
    changeMsg = `No change in weight`
  }

  return (
    <li key={entry.id || entry._id}>
      {new Date(entry.date).toLocaleDateString()}: Current Weight: {entry.weight}, Previous Weight: {entry.latestChange}, Notes: {entry.notes}
      {" "}
      <strong>{changeMsg}</strong>
      <button onClick={() => handleEdit(entry)}>Edit</button>
      <button onClick={() => handleDelete(entry.id || entry._id)}>Delete</button>
    </li>
  )
})}
    </ul> */}
  </div>
  )
}

export default ProgressList
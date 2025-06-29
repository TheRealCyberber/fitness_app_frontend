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

  return (
    <div>
    <h2>My Progress</h2>
    {!editingId && (
      <ProgressForm onSubmit={handleAdd} /> 
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
    <ul>
      {progress.map((entry) => (
        <li key={entry.id || entry._id}>
          {new Date(entry.date).toLocaleDateString()}: Weight: {entry.weight}, Latest Weight: {entry.latestChange}, Notes: {entry.notes}
          <button onClick={() => handleEdit(entry)}>Edit</button>
          <button onClick={() => handleDelete(entry.id || entry._id)}>Delete</button>
        </li>
      ))}
    </ul>
  </div>
  )
}

export default ProgressList
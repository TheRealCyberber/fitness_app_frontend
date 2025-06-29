import ProgressForm from './ProgressForm'
import { useEffect, useState } from 'react'
import { GetProgress, DeleteProgress, UpdateProgress } from '../../services/progress'

const ProgressList = () => {
  const [progress, setProgress] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editDate, setEditDate] = useState('')
  const [editWeight, setEditWeight] = useState('')
  const [editLatestChange, setEditLatestChange] = useState('')
  const [editNotes, setEditNotes] = useState('')

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
  const handleAdd = (newEntry) => {
    setProgress([...progress, newEntry])
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
    setEditDate(entry.date)
    setEditWeight(entry.weight)
    setEditLatestChange(entry.latestChange)
    setEditNotes(entry.notes || '')
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    try {
      const updated = await UpdateProgress(editingId, { date: editDate, weight: editWeight, latestChange: editLatestChange, notes: editNotes })
      setProgress((prev) =>
        prev.map((p) => (p.id || p._id) === editingId ? updated : p)
      )
      setEditingId(null)
      setEditDate('')
      setEditWeight('')
      setEditLatestChange('')
      setEditNotes('')
    } catch {
      alert('Failed to update progress')
    }
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditDate('')
    setEditWeight('')
    setEditLatestChange('')
    setEditNotes('')
  }

  return (
    <div>
      <h2>My Progress</h2>
      {!editingId && (
        <ProgressForm onAdd={handleAdd} />
      )}
      {editingId && (
        <form onSubmit={handleEditSubmit}>
          <input
            type="date"
            value={editDate}
            onChange={(e) => setEditDate(e.target.value)}
          />
          <input
            type="number"
            placeholder="Current Weight"
            value={editWeight}
            onChange={(e) => setEditWeight(e.target.value)}
          />
          <input
            type="number"
            placeholder="Latest Change"
            value={editLatestChange}
            onChange={(e) => setEditLatestChange(e.target.value)}
          />
          <input
            type="text"
            placeholder="Notes (optional)"
            value={editNotes}
            onChange={(e) => setEditNotes(e.target.value)}
          />
          <button type="submit">Update</button>
          <button type="button" onClick={handleCancelEdit}>Cancel</button>
        </form>
      )}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {progress.map((entry) => (
          <li key={entry.id || entry._id}>
            {new Date(entry.date).toLocaleDateString()}: Weight: {entry.weight}, Change: {entry.latestChange}, Notes: {entry.notes}
            <button onClick={() => handleEdit(entry)}>Edit</button>
            <button onClick={() => handleDelete(entry.id || entry._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProgressList
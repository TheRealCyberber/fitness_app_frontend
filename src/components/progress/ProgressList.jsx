import { useEffect, useState } from 'react'
import { GetProgress, AddProgress, DeleteProgress, UpdateProgress } from '../../services/progress'

const ProgressList = () => {
  const [progress, setProgress] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editDate, setEditDate] = useState('')
  const [editValue, setEditValue] = useState('')

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

  const handleAddProgress = async (e) => {
    e.preventDefault()
    if (!editDate || !editValue) return
    try {
      const newEntry = await AddProgress({ date: editDate, value: editValue })
      setProgress([...progress, newEntry])
      setEditDate('')
      setEditValue('')
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
    setEditDate(entry.date)
    setEditValue(entry.value)
  }


  const handleEditSubmit = async (e) => {
    e.preventDefault()
    try {
      const updated = await UpdateProgress(editingId, { date: editDate, value: editValue })
      setProgress((prev) =>
        prev.map((p) => (p.id || p._id) === editingId ? updated : p)
      )
      setEditingId(null)
      setEditDate('')
      setEditValue('')
    } catch {
      alert('Failed to update progress')
    }
  }


  const handleCancelEdit = () => {
    setEditingId(null)
    setEditDate('')
    setEditValue('')
  }

  return (
    <div>
      <h2>My Progress</h2>
      {!editingId && (
        <form onSubmit={handleAddProgress}>
          <input
            type="date"
            value={editDate}
            onChange={(e) => setEditDate(e.target.value)}
          />
          <input
            type="number"
            placeholder="Value"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
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
            placeholder="Value"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
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
            {entry.date}: {entry.value}
            <button onClick={() => handleEdit(entry)}>Edit</button>
            <button onClick={() => handleDelete(entry.id || entry._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProgressList
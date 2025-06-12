import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import api from '../lib/axios'
import { ArrowLeftIcon, Pencil, Save } from 'lucide-react'

const NoteDetailPage = () => {
  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [saving, setSaving] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await api.get(`/notes/${id}`)
        setNote(response.data)
        setTitle(response.data.title)
        setContent(response.data.content)
      } catch (error) {
        toast.error("Failed to fetch note")
      } finally {
        setLoading(false)
      }
    }
    fetchNote()
  }, [id])

const handleSave = async () => {
  if (!title.trim() || !content.trim()) {
    toast.error('Title and Content are required!');
    return;
  }
  setSaving(true)
  try {
    await api.put(`/notes/${id}`, { title, content })
    setNote({ ...note, title, content })
    setEditMode(false)
    toast.success('Note updated!')
    navigate('/') // Close the update page and go back to notes list
  } catch (err) {
    toast.error('Failed to update note')
  } finally {
    setSaving(false)
  }
}

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-primary text-lg">
        Loading note...
      </div>
    )
  }

  if (!note) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-error text-lg mb-4">Note not found.</p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          <ArrowLeftIcon className="mr-2" /> Back to Notes
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-200 font-sans">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <button
          className="btn btn-ghost mb-6 flex items-center gap-2"
          onClick={() => navigate('/')}
        >
          <ArrowLeftIcon className="size-5" />
          Back to Notes
        </button>
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body">
            <div className="flex justify-between items-center mb-4">
              <h2 className="card-title text-2xl font-bold text-primary">
                Note Details
              </h2>
              {!editMode && (
                <button
                  className="btn btn-sm btn-outline"
                  onClick={() => setEditMode(true)}
                  title="Edit"
                >
                  <Pencil size={18} />
                </button>
              )}
            </div>
            <div className="space-y-4">
              {editMode ? (
                <>
                  <label className="block text-base-content font-semibold mb-1" htmlFor="edit-title">
                    Title
                  </label>
                  <input
                    id="edit-title"
                    className="input input-bordered w-full bg-base-200 focus:bg-base-100 transition"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Title"
                  />
                  <label className="block text-base-content font-semibold mb-1" htmlFor="edit-content">
                    Content
                  </label>
                  <textarea
                    id="edit-content"
                    className="textarea textarea-bordered w-full bg-base-200 focus:bg-base-100 transition"
                    rows={8}
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="Content"
                  />
                  <button
                    className={`btn btn-primary btn-sm mt-2 ${saving ? 'loading' : ''}`}
                    onClick={handleSave}
                    disabled={saving}
                    title="Save"
                  >
                    <Save size={16} className="mr-2" />
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                </>
              ) : (
                <>
                  <label className="block text-base-content font-semibold mb-1">
                    Title
                  </label>
                  <div className="mb-4 px-3 py-2 rounded bg-base-200 text-base-content border border-base-300">
                    {note.title}
                  </div>
                  <label className="block text-base-content font-semibold mb-1">
                    Content
                  </label>
                  <p className="text-base-content/80 whitespace-pre-line px-3 py-2 rounded bg-base-200 border border-base-300">
                    {note.content}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage
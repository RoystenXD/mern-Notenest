import React from 'react'
import { FileQuestion } from 'lucide-react'
import { Link } from 'react-router'

const NotesNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <FileQuestion size={48} className="mb-4 text-base-content/60" />
      <h2 className="text-xl font-semibold text-base-content mb-2">No Notes Found</h2>
      <p className="text-base-content/70 mb-6">You haven't created any notes yet. Start by adding a new note!</p>
      <Link
        to="/create"
        className="btn btn-primary normal-case px-6"
      >
        Create your first note
      </Link>
    </div>
  )
}

export default NotesNotFound
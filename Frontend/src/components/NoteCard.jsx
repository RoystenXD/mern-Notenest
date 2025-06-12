import React from 'react'
import { Link, useNavigate } from 'react-router'
import { Trash2, Pencil } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../lib/axios'

const NoteCard = ({ note, onDelete, onUpdate, setNotes}) => {
  const navigate = useNavigate();

  // Format date and time
  const date = note.createdAt ? new Date(note.createdAt) : null;
  const formattedDate = date
    ? date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
    : '';
  const formattedTime = date
    ? date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
    : '';

  // Handle delete note with toast notification
  const handleDelete = async (id) => {
      try {
        await api.delete(`/notes/${id}`);
        setNotes((prevNotes) => prevNotes.filter(note => note._id !== id));
        toast.success('Note deleted!');
        if (onDelete) onDelete(id);
      } catch (err) {
        toast.error('Failed to delete note');
    }
  };

  // Handle update note (navigate or call onUpdate)
  const handleUpdate = (note) => {
    toast('Edit mode enabled!');
    if (onUpdate) {
      onUpdate(note);
    } else {
      navigate(`/note/${note._id}?edit=true`);
    }
  };

  return (
    <div className="relative font-sans bg-base-200 border border-base-300 rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 overflow-hidden">
      <Link
        to={`/note/${note._id}`}
        className="block"
      >
        <h3 className="text-xl font-extrabold text-[#eceff4] mb-2 tracking-tight">{note.title}</h3>
        <p className="text-[#d8dee9] line-clamp-3 mb-4">{note.content}</p>
        {date && (
          <div className="flex items-center justify-between text-xs text-[#81a1c1] mt-2">
            <span>{formattedDate}</span>
            <span>{formattedTime}</span>
          </div>
        )}
      </Link>
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          onClick={() => handleUpdate(note)}
          className="p-1 rounded hover:bg-[#a3be8c]/20 transition"
          title="Update note"
        >
          <Pencil size={20} className="text-[#a3be8c]" />
        </button>
        <button
          onClick={() => handleDelete(note._id)}
          className="p-1 rounded hover:bg-[#bf616a]/20 transition"
          title="Delete note"
        >
          <Trash2 size={20} className="text-[#bf616a]" />
        </button>
      </div>
    </div>
  );
};

export default NoteCard
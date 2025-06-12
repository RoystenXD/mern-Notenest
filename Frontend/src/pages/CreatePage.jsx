import React, { useState } from 'react'
import { Link } from 'react-router'
import { ArrowLeftIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../lib/axios'

const CreatePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    await api.post('/notes', { title, content });
    toast.success('Note created!');
    setTitle('');
    setContent('');
    // Show toast for a short time before redirecting
    setTimeout(() => {
      window.location.href = '/';
    }, 1200);
  } catch (err) {
    toast.error('Failed to create note');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-base-200 font-sans">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="btn btn-ghost mb-6 flex items-center gap-2 w-fit">
            <ArrowLeftIcon className="size-5" />
            <span>Back to Notes</span>
          </Link>
          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body">
              <h2 className="card-title text-2xl font-bold mb-4 text-primary">Create a New Note</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base-content font-semibold">Title</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter note title"
                    className="input input-bordered w-full bg-base-200 focus:bg-base-100 transition"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base-content font-semibold">Content</span>
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter note content"
                    className="textarea textarea-bordered w-full bg-base-200 focus:bg-base-100 transition"
                    rows="6"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`btn btn-primary mt-2 px-6 py-2 text-base font-semibold normal-case ${loading ? 'loading' : ''}`}
                >
                  {loading ? 'Creating...' : 'Create Note'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Decorative effect at the bottom */}
      <div className="pointer-events-none fixed bottom-0 left-0 w-full z-[-1]">
        <div className="w-full h-32 bg-gradient-to-t from-primary to-transparent opacity-30 blur-2xl" />
        <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-48 h-8 rounded-full bg-primary opacity-20 blur-xl" />
      </div>
    </div>
  );
};

export default CreatePage;
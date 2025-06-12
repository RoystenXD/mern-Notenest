import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import NoteDetailPage from './pages/NoteDetailPage'
import toast from 'react-hot-toast'

const App = () => {
  return (
    <div data-theme="business" className="relative min-h-screen">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
      {/* Decorative effect at the bottom */}
      <div className="pointer-events-none fixed bottom-0 left-0 w-full z-[-1]">
        <div className="w-full h-32 bg-gradient-to-t from-primary to-transparent opacity-30 blur-2xl" />
        <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-48 h-8 rounded-full bg-primary opacity-20 blur-xl" />
      </div>
    </div>
  )
}

export default App
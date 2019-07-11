import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Note from './components/Note'
import noteService from './services/notes'

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("Add a new note...")
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    noteService
      .getAll()
      .then(resNotes => {
        setNotes(resNotes)
      })
      .catch(error => alert("Error: couldn't load notes from server"))
  }, [])

  const newNoteChange = (event) => setNewNote(event.target.value)

  const addNote = (event) => {
    event.preventDefault()

    const newNoteObj = {
      content: newNote,
      date: new Date,
      important: false
    }

    noteService
      .create(newNoteObj)
      .then(resNote => {
        setNotes(notes.concat(resNote))
      })
      .catch(error => alert("Error: couldn't create note"))

    setNewNote("Add a new note...")
  }

  const toggleImportance = id => {
    const oldNote = notes.find(n => n.id === id)
    const newNote = {...oldNote, important: !oldNote.important}

    noteService
      .update(id, newNote)
      .then(resNote => {
        setNotes(notes.map(n => n.id !== id ? n : resNote))
      })
      .catch(error => alert("Error: couldn't update note"))
  }


  const rows = () => {
    const itemsToShow = showAll ? notes : notes.filter(note => note.important)
    return (itemsToShow.map(note =>
      <Note
        key={note.id}
        note={note}
        toggleImportance={() => toggleImportance(note.id)}
      />))
  }

  return (
    <>
      <div>
        <h1>Notes</h1>
        <ul>
          {rows()}
        </ul>
      </div>
      <div>
        <form onSubmit={addNote}>
          <input value={newNote} onChange={newNoteChange} />
          <button type="submit">save</button>
        </form>
      </div>
      <button onClick={() => setShowAll(!showAll)}>Show {showAll ? "important only" : "all"}</button>
    </>
  )

}

export default App
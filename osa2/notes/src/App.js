import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Note from './components/Note'
import axios from 'axios'

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("Add a new note...")
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    axios
      .get("http://localhost:3001/notes")
      .then(response => {
        setNotes(response.data)
      })
  }, [])

  const rows = () => {
    const itemsToShow = showAll ? notes : notes.filter(note => note.important)
    return (itemsToShow.map(note => <Note key={note.id} note={note} />))
  }

  const addNote = (event) => {
    event.preventDefault()

    const newNoteObj = {
      id: notes.length + 1,
      content: newNote,
      date: new Date,
      important: false
    }

    setNotes(notes.concat(newNoteObj))
    setNewNote("Add a new note...")
  }

  const newNoteChange = (event) => {
    setNewNote(event.target.value)
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
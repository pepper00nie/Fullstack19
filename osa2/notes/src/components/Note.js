import React from 'react'

const Note = ({ note, toggleImportance }) => <li>{note.content},{note.id} <button onClick={toggleImportance} >Make {note.important ? "unimportant" : "important"}</button></li>

export default Note
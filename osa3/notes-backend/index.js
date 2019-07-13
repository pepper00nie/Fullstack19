const express = require('express')
const app = express()
const bodyParser = require('body-parser')

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true
  }
]

app.use(bodyParser.json())

app.get('/', (req, res) => {
	res.send('hello world')
})

app.get('/notes', (req, res) => {
  res.json(notes)
})

app.get('/notes/:id', (req, res) => {
  const note = notes.find(n => n.id === Number(req.params.id))
  note ? res.json(note) : res.status(404).end()
})

app.post('/notes', (req, res) => {
  if (!req.body.content) {
    return res.status(400).json({ error: "no content" })
  }

  const newId = notes.length > 0 ? notes.length + 1 : 0

  const newNote = {
    id: newId,
    date: new Date(),
    content: req.body.content,
    important: req.body.important || false
  }

  notes = notes.concat(newNote)
  res.json(newNote)
})

app.delete('/notes/:id', (req, res) => {
  notes = notes.filter(n => n.id !== Number(req.params.id))
  res.status(204).end()
})

const port = 3001
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log("give password")
  process.exit(1)
}

const pwd = process.argv[2]
const url = `mongodb+srv://fullstack19:${pwd}@cluster0-d3ege.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'How are u',
  date: new Date(),
  important: false,
})
/*

note.save().then(response => {
  console.log('note saved')
  mongoose.connection.close()
})*/

Note.find({}).then(res => {
  res.forEach(n => console.log(n))
  mongoose.connection.close()
})
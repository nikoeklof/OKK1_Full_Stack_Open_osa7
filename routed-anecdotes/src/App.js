import { useState } from 'react'
import { Routes, Route, Link, useMatch, useNavigate } from 'react-router-dom'
import { useField } from './hooks'
import { Container, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to='/' style={padding}>Anecdotes</Link>
      <Link to='/create' style={padding}>create new</Link>
      <Link to='/about' style={padding}>about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>

            {anecdotes.map(anecdote =>
              <TableRow key={anecdote.id}>
                <TableCell>
                  <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
                </TableCell>
                <TableCell>{anecdote.author}</TableCell>
              </TableRow>)}


          </TableBody>
        </Table>
      </TableContainer>
    </div >
  )
}
const SingleAnecdote = ({ anecdote }) => {

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>has {anecdote.votes} votes</p>
      <p> for more info see <a href={
        anecdote.info.includes("http://") || anecdote.info.includes("https://")
          ? anecdote.info : `http://${anecdote.info}`
      } target="_blank" rel='noreferrer'>{anecdote.info}</a>
      </p>
    </div >
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {

  const contentInput = useField('text')
  const authorInput = useField('text')
  const infoInput = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: contentInput.value,
      author: authorInput.value,
      info: infoInput.value,
      votes: 0
    })

  }
  const resetFields = (e) => {
    e.preventDefault()
    contentInput.resetField()
    authorInput.resetField()
    infoInput.resetField()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={contentInput.value} onChange={(e) => contentInput.onChange(e)} />
        </div>
        <div>
          author
          <input name='author' value={authorInput.value} onChange={(e) => authorInput.onChange(e)} />
        </div>
        <div>
          url for more info
          <input name='info' value={infoInput.value} onChange={(e) => infoInput.onChange(e)} />
        </div>
        <button>create</button>
        <button onClick={resetFields}>Reset</button>
      </form>
    </div>
  )

}

const Notification = ({ message }) => {

  const notificationStyle = {
    border: '1px solid black',
    maxWidth: 'fit-content',
    padding: '5px',
    margin: '10px 0 0 0'
  }
  if (message !== "") {
    return (
      <div style={notificationStyle}>
        {message}
      </div>
    )
  }
  return (
    <div></div>
  )
}

const App = () => {
  const navigate = useNavigate()
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])




  const [notification, setNotification] = useState('')
  let oldTimeout
  const addNew = (anecdote) => {
    clearTimeout(oldTimeout)
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    navigate("/")
    setNotification(`Created: ${anecdote.content} by ${anecdote.author}`)
    oldTimeout = setTimeout(() => setNotification(""), 4000)
  }

  const anecdoteById = (id) => anecdotes.find(a => a.id === id)
  const match = useMatch('/anecdotes/:id')
  const anecdote = match ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id)) : null;


  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (

    <Container>
      <div >
        <h1>Software anecdotes</h1>
        <Menu />
        <Notification message={notification} />
        <Routes>
          <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path='/anecdotes/:id' element={<SingleAnecdote anecdote={anecdote} />} />
          <Route path='/about' element={<About />} />
          <Route path='/create' element={<CreateNew addNew={addNew} />} />
        </Routes>
        <Footer />
      </div>
    </Container>

  )
}

export default App

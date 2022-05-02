import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'

const BlogForm = ({ handleBlogForm }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const onSubmitHandleForm = (event) => {
    event.preventDefault()
    handleBlogForm(title, author, url)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Card style={{ marginBottom: '20px', width: '50%', background: "rgba(0,0,0,0.07)" }}>
      <CardContent>
        <form onSubmit={onSubmitHandleForm}>
          <div>
            <TextField
              id="outlined-basic"
              label="title"
              value={title}
              name="Title"
              variant='outlined'
              onChange={({ target }) => setTitle(target.value)}
              required

            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="author"
              value={author}
              name="Author"
              variant='outlined'
              onChange={({ target }) => setAuthor(target.value)}
              required
              style={{ marginTop: "10px" }}
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="Url"
              type="url"
              value={url}
              name="Url"
              variant='outlined'
              onChange={({ target }) => setUrl(target.value)}
              required
              style={{ marginTop: "10px" }}
            />
          </div>
        </form>
      </CardContent>
      <CardActions>
        <Button
          onClick={onSubmitHandleForm}
          variant="contained"

          id="submit-blog"
          style={{ color: "white", backgroundColor: "black" }}
        >
          create
        </Button>
      </CardActions>
    </Card>
  )
}

export default BlogForm

import { useState, useEffect, useRef } from 'react'

import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notifyError('Wrong username or password.')
    }
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const addedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(addedBlog))
      notifySuccess('Blog added successfully.')
    } catch (exception) {
      notifyError('Unable to add blog.')
    }
  }

  const notifySuccess = (message) => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage('')
    }, 5000)
  }

  const notifyError = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage('')
    }, 5000)
  }

  const loginForm = {
    variables: [username, password],
    functions: [handleLogin, setUsername, setPassword]
  }

  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} type='error'/>
        <h2>Login</h2>
        <LoginForm form={loginForm}/>
      </div>
    )
  }

  return (
    <div>

      <p>
        Logged in as {user.name}
        <button onClick={handleLogout}>Logout</button>
      </p>

      <Notification message={successMessage} type='success'/>

      <h2>Create a new blog</h2>
      <Togglable buttonLabel="New blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog}/>
      </Togglable>

      <h2>Blogs</h2>
      <BlogList blogs={blogs}/>

    </div>
  )
}

export default App
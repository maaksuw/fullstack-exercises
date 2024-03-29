import { useState, useEffect, useRef } from 'react'

import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Button from './components/Button'

import blogService from './services/blogs'
import loginService from './services/login'

import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()
  const loginNRef = useRef()
  const blogNRef = useRef()

  const updateBlogs = (newBlogs) => {
    newBlogs.sort((a, b) => {
      return b.likes - a.likes
    })
    setBlogs(newBlogs)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      updateBlogs(blogs)
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

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      loginNRef.current.notifyError('Wrong username or password.')
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
      updateBlogs(blogs.concat(addedBlog))
      blogNRef.current.notifySuccess('Blog added successfully.')
    } catch (exception) {
      blogNRef.current.notifyError('Something went wrong. Unable to add blog.')
    }
  }

  const likeBlog = async (blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogObject)
      const updatedBlogs = blogs.map(blog => {
        if (blog.id === updatedBlog.id) {
          return updatedBlog
        }
        return blog
      })
      updateBlogs(updatedBlogs)
    } catch (exception) {
      blogNRef.current.notifyError('Something went wrong. Unable to like blog.')
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id)
      const updatedBlogs = blogs.filter(blog => blog.id !== id)
      updateBlogs(updatedBlogs)
    } catch (exception) {
      blogNRef.current.notifyError('Something went wrong. Unable to delete blog.')
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification ref={loginNRef} />
        <h2>Login</h2>
        <LoginForm login={handleLogin} />
      </div>
    )
  }

  return (
    <div>

      <p>
        Logged in as {user.name}
        <Button action={handleLogout} text="Logout" />
      </p>

      <Notification ref={blogNRef} />

      <h2>Create a new blog</h2>
      <Togglable buttonLabel="New blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      <h2>Blogs</h2>
      <BlogList blogs={blogs} user={user} likeBlog={likeBlog} deleteBlog={deleteBlog} />

    </div>
  )
}

export default App
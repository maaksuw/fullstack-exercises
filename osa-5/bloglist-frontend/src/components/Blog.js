import { useState } from 'react'
import Button from './Button'

const Blog = ({ blog, user, likeBlog, deleteBlog }) => {
  const [fullView, setFullView] = useState(false)

  const style = { display: (user.name === blog.user.name) ? '' : 'none' }

  const like = () => {
    blog.likes += 1
    blog.user = blog.user.id
    likeBlog(blog)
  }

  const remove = () => {
    if (window.confirm('Do you really want to delete this blog?')) {
      deleteBlog(blog.id)
    }
  }

  if (fullView) {
    return (
      <div className='blog'>
        <p>
          {blog.title} by {blog.author}
          <Button text="Hide" action={() => setFullView(!fullView)} />
        </p>
        <p>
          URL: <a href={blog.url}>{blog.url}</a>
        </p>
        <p>
          Likes: {blog.likes}
          <Button text="Like" action={() => like()} id="like-button"/>
        </p>
        <p>Added by user: {blog.user.username}</p>
        <Button text="Delete" action={() => remove()} style={style} id="delete-button"/>
      </div>
    )
  }

  return (
    <div className='blog'>
      <p>
        {blog.title} by {blog.author}
        <Button text="View" action={() => setFullView(!fullView)} />
      </p>
    </div>
  )
}

export default Blog
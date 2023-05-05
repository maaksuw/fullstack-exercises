import { useState } from 'react'
import Button from './Button'

const Blog = ({blog, likeBlog}) => {
  const [show, setShow] = useState(false)

  const like = () => {
    blog.likes += 1
    blog.user = blog.user.id
    likeBlog(blog)
  }

  if (show) {
    return (
      <div className='blog'>
        <p>
          {blog.title} by {blog.author}
          <Button text="Hide" action={() => setShow(!show)}/>
        </p>
        <p>
          URL: <a href={blog.url}>{blog.url}</a>
        </p>
        <p>
          Likes: {blog.likes}
          <Button text="Like" action={() => like()}/>
        </p>
        <p>Added by user: {blog.user.username}</p>
      </div>
    )
  }

  return (
  <div className='blog'>
    <p>
      {blog.title} by {blog.author}
      <Button text="View" action={() => setShow(!show)}/>
    </p>
  </div>
  )
}

export default Blog
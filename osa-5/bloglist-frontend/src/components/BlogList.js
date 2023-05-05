import Blog from './Blog'

const BlogList = ({blogs, likeBlog}) => {
	return (blogs.map(blog =>
    <Blog key={blog.id} blog={blog} likeBlog={likeBlog}/>
	))
}

export default BlogList
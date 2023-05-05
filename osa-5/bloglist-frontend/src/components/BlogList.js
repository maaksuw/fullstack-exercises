import Blog from './Blog'

const BlogList = ({blogs, user, likeBlog, deleteBlog}) => {
	return (blogs.map(blog =>
    <Blog key={blog.id} blog={blog} user={user} likeBlog={likeBlog} deleteBlog={deleteBlog}/>
	))
}

export default BlogList
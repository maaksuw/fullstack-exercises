const BlogForm = ({form}) => {
	const [addBlog, handleTitleChange, handleAuthorChange, handleUrlChange] = form.functions
	const [newTitle, newAuthor, newUrl] = form.variables
	return (
		<form onSubmit={addBlog}>
			<div> Title: <input value={newTitle} onChange={handleTitleChange}/> </div>
			<div> Author: <input value={newAuthor} onChange={handleAuthorChange}/> </div>
			<div> Url: <input value={newUrl} onChange={handleUrlChange}/> </div>
			<div>
				<button type="submit">Add</button>
			</div>
		</form>
	)
}

export default BlogForm
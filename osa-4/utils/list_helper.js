const nodemon = require("nodemon")

const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	const sumLikes = (cumul, item) => {
		return cumul + item.likes
	}
	return blogs.reduce(sumLikes, 0)
}

const favouriteBlog = (blogs) => {
	favBlog = null
	mostLikes = 0
	blogs.forEach((blog) => {
		if (blog.likes >= mostLikes) {
			favBlog = blog
			mostLikes = favBlog.likes
		}
	})
	return favBlog
}

module.exports = {
	dummy,
	totalLikes,
	favouriteBlog
}
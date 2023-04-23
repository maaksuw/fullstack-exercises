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
	let favBlog = {}
	let mostLikes = 0
	blogs.forEach((blog) => {
		if (blog.likes >= mostLikes) {
			favBlog = blog
			mostLikes = favBlog.likes
		}
	})
	return favBlog
}

const mostBlogs = (blogs) => {
	const m = new Map()
	blogs.forEach(({ author }) => {
		if (m.has(author)) {
			m.set(author, m.get(author) + 1)
		} else {
			m.set(author, 1)
		}
	})
	const result = {}
	m.forEach((value, key) => {
		if ('blogs' in result === false || value >= result.blogs) {
			result.author = key
			result.blogs = value
		}
	})
	return result
}

const mostLikes = (blogs) => {
	const m = new Map()
	blogs.forEach(({ author, likes }) => {
		if (m.has(author)) {
			m.set(author, m.get(author) + likes)
		} else {
			m.set(author, likes)
		}
	})
	const result = {}
	m.forEach((value, key) => {
		if ('likes' in result === false || value >= result.likes) {
			result.author = key
			result.likes = value
		}
	})
	return result
}

module.exports = {
	dummy,
	totalLikes,
	favouriteBlog,
	mostBlogs,
	mostLikes
}
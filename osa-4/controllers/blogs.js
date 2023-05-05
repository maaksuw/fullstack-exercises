const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
	response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

	const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'invalid token' })
  }

  const user = request.user
	const body = request.body

	if (!body.title || !body.url) {
		return response.status(400).send({ error: 'Blog is missing title or url.' })
	}

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes || 0,
		user: user._id
	})

	const result = await blog.save()
	result.populate('user', { username: 1, name: 1 })
	
	user.blogs = user.blogs.concat(result._id)
	await user.save()

	response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
	
	if (!request.token) {
		return response.status(401).send({ error: 'missing token' })
	}

	const blogId = request.params.id
	const blog = await Blog.findById(blogId)
	const userIdFromBlog = blog.user

	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	const userIdFromToken = decodedToken.id

	if (userIdFromBlog.toString() === userIdFromToken.toString()) {
		await Blog.findByIdAndRemove(blogId)
  	response.status(204).end()
	} else {
		response.status(401).send({ error: 'invalid token'})
	}
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body
  const id = request.params.id

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })

  response.json(updatedBlog)
})

module.exports = blogsRouter
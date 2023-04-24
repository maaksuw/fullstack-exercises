const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
	const body = request.body

	if (!body.title || !body.url) {
		return response.status(400).send({ error: 'Blog is missing title or url.' })
	}

	const blog = new Blog({
		title: body.title,
    	author: body.author,
    	url: body.url,
		likes: body.likes || 0
	})

	const result = await blog.save()
	response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
	await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter
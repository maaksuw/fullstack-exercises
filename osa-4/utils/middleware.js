const jwt = require('jsonwebtoken')
const logger = require('./logger')
const User = require('../models/user')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor = (request, response, next) => {
	const authorization = request.get('authorization')
	if (authorization && authorization.startsWith('Bearer ')) {
		request.token = authorization.replace('Bearer ', '')
	} else {
		request.token = null
	}
	next()
}

const userExtractor = async (request, response, next) => {
	if (!request.token) {
		request.user = null
	} else {
		const decodedToken = jwt.verify(request.token, process.env.SECRET)
		request.user = await User.findById(decodedToken.id)
	}
	next()
}

module.exports = {
	unknownEndpoint,
	tokenExtractor,
	userExtractor
}
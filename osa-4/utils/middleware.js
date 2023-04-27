const logger = require('./logger')

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

module.exports = {
	unknownEndpoint,
	tokenExtractor
}
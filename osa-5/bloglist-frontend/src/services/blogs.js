import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (blogObject) => {
	const config = {
		headers: { Authorization: token },
	}
	const response = await axios.post(baseUrl, blogObject, config)
	return response.data
}

const update = async (blogObject) => {
	const id = blogObject.id
	const response = await axios.put(`${baseUrl}/${id}`, blogObject)
	return response.data
}

const remove = async (id) => {
	const config = {
		headers: { Authorization: token },
	}
	return await axios.delete(`${baseUrl}/${id}`, config)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { setToken, getAll, create, update, remove }
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Missen blogi',
    author: 'Misse Missenen',
    url: 'miaumou.fi',
    likes: 503
  },
  {
    title: 'Pupun Seikkailut',
    author: 'Jussikaisen Pupu',
    url: 'porkkanapiiras.fi',
    likes: 123
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
	const response = await api.get('/api/blogs')
	
	expect(response.body).toHaveLength(initialBlogs.length)
})

test('blogs id field is "id" and not "_id"', async () => {
  const blogs = (await api.get('/api/blogs')).body
	blogs.forEach((blog) => {
		expect(blog.id).toBeDefined()
	})
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Nuuhkis ja Kalakaverit',
    author: 'Nuuhkis Nuuhkulainen',
    url: 'lohipallero.fi',
    likes: 777
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = (await api.get('/api/blogs')).body

  const titles = blogs.map(b => b.title)

  expect(blogs).toHaveLength(initialBlogs.length + 1)
  expect(titles).toContain(
    'Nuuhkis ja Kalakaverit'
  )
})

test('if likes is not given it defaults to zero', async () => {
  const blogWithoutLikes = {
    title: 'Nuuhkis ja Kalakaverit',
    author: 'Nuuhkis Nuuhkulainen',
    url: 'lohipallero.fi'
  }

  const result = await api
    .post('/api/blogs')
    .send(blogWithoutLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/)
	
	expect(result.body.likes).toBe(0)
})

afterAll(async () => {
  await mongoose.connection.close()
})
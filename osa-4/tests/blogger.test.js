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

afterAll(async () => {
  await mongoose.connection.close()
})
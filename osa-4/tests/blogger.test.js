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
	const blogs = (await api.get('/api/blogs')).body
	
	expect(blogs).toHaveLength(initialBlogs.length)
})

test('blogs id field is "id" and not "_id"', async () => {
  const blogs = (await api.get('/api/blogs')).body
	blogs.forEach((blog) => {
		expect(blog.id).toBeDefined()
	})
})


describe('post method', () => {

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
  
  test('blog must contain title', async () => {
    const blogWithoutTitle = {
      author: 'Nuuhkis Nuuhkulainen',
      url: 'lohipallero.fi'
    }
  
    await api
      .post('/api/blogs')
      .send(blogWithoutTitle)
      .expect(400)
  })
  
  test('blog must contain url', async () => {
    const blogWithoutUrl = {
      title: 'Nuuhkis ja Kalakaverit',
      author: 'Nuuhkis Nuuhkulainen'
    }
  
    await api
      .post('/api/blogs')
      .send(blogWithoutUrl)
      .expect(400)
  })

})


describe('delete method', () => {

  test('a blog can be deleted', async () => {
    const blog = {
      title: 'Nuuhkis ja Kalakaverit',
      author: 'Nuuhkis Nuuhkulainen',
      url: 'lohipallero.fi'
    }
  
    const result = await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const id = result.body.id
  
    await api
      .delete(`/api/blogs/${id}`)
      .expect(204)
  
    const blogs = (await api.get('/api/blogs')).body
    const titles = blogs.map(blog => blog.title)
  
    expect(titles).not.toContain(blog.title)
  })

})


describe('put method', () => {

  test('a blog can be updated', async () => {
    const newBlog = {
      title: 'Nuuhkis ja Kalakaverit',
      author: 'Nuuhkis Nuuhkulainen',
      url: 'lohipallero.fi',
      likes: 777
    }
  
    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blog = result.body
  
    const modifiedBlog = (await api
      .put(`/api/blogs/${blog.id}`)
      .send({
        ...blog,
        likes: 900
      })).body
  
    expect(modifiedBlog.id).toBe(blog.id)
    expect(modifiedBlog.title).toBe(blog.title)
    expect(modifiedBlog.author).toBe(blog.author)
    expect(modifiedBlog.url).toBe(blog.url)
    expect(modifiedBlog.likes).toBe(900)
  })

})


afterAll(async () => {
  await mongoose.connection.close()
})
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const User = require('../models/user')

const initialUsers = [
  {
    username: 'Möhissss',
    name: 'Möhis',
    password: 'hunaja'
  },
  {
    username: 'Spot',
    name: 'Puppe',
    password: 'hauhau'
  },
]

beforeEach(async () => {
  await User.deleteMany({})
  // await User.insertMany(initialBlogs)
})

describe('adding a user', () => {

	test('works when given valid data', async () => {
		const user = initialUsers[0]
    
    await api
      .post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)
	})

	describe("doesn't work when", () => {

		const expect400 = async (errormsg, user) => {
			const result = await api
			.post('/api/users')
			.send(user)
			.expect(400)

			expect(result.body.error).toBe(errormsg)
		}

		describe("missing", () => {

			test("a username", async () => {
				const user = {
					name: 'Puppe',
					password: 'hauhau'
				}
					
				expect400('username and password required', user)
			})

			test("a password", async () => {
				const user = {
					username: 'Spot',
					name: 'Puppe'
				}
					
				expect400('username and password required', user)
			})

			test("username and password", async () => {
				const user = {
					name: 'Puppe'
				}
					
				expect400('username and password required', user)
			})

		})

		describe("shorter than 3 characters", () => {

			test("username", async () => {
				const user = {
					username: '<3',
					name: 'Puppe',
					password: 'hauhau'
				}
				
				expect400('username and password must be at least 3 characters', user)
			})

			test("password", async () => {
				const user = {
					username: 'Spot',
					name: 'Puppe',
					password: 'ha'
				}
					
				expect400('username and password must be at least 3 characters', user)
			})

			test("username and password", async () => {
				const user = {
					username: '<3',
					name: 'Puppe',
					password: 'ha'
				}
					
				expect400('username and password must be at least 3 characters', user)
			})

		})

	})
  
})

afterAll(async () => {
  await mongoose.connection.close()
})
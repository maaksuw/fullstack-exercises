const helper = require('../utils/list_helper')

const blogs = [
	{
		_id: "5a422a851b54a676234d17f7",
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 7,
		__v: 0
	},
	{
		_id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5,
		__v: 0
	},
	{
		_id: "5a422b3a1b54a676234d17f9",
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 12,
		__v: 0
	},
	{
		_id: "5a422b891b54a676234d17fa",
		title: "First class tests",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
		likes: 10,
		__v: 0
	},
	{
		_id: "5a422ba71b54a676234d17fb",
		title: "TDD harms architecture",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
		likes: 0,
		__v: 0
	},
	{
		_id: "5a422bc61b54a676234d17fc",
		title: "Type wars",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
		likes: 2,
		__v: 0
	}  
]

test('dummy returns one', () => {
	const blogs = []

	const result = helper.dummy(blogs)
	expect(result).toBe(1)
})

describe('total likes', () => {

	test('of empty list is zero', () => {
		const blogs = []

		const result = helper.totalLikes(blogs)
		expect(result).toBe(0)
	})

	test('of list size one is likes of the only item', () => {
		const blog = []
		blog.push(blogs[0])

		const result = helper.totalLikes(blog)
		expect(result).toBe(7)
	})

	test('of a bigger list is sum of likes of all items', () => {
		const result = helper.totalLikes(blogs)
		expect(result).toBe(36)
	})

})

describe('favourite blog', () => {

	test('of empty list is {}', () => {
		const blogs = []

		const result = helper.favouriteBlog(blogs)
		expect(result).toEqual({})
	})

	test('of a long list works', () => {
		const bestBlog = blogs[2]

		const result = helper.favouriteBlog(blogs)
		expect(result).toEqual(bestBlog)
	})

	test('works when multiple blogs with most likes', () => {
		const newBlogs = blogs.concat(blogs[2])
		expect(newBlogs.length).toBe(blogs.length + 1)

		const result = helper.favouriteBlog(newBlogs)
		expect(result.likes).toBe(12)
	})

})

describe('most blogs', () => {

	test('of an empty list is {}', () => {
		const blogs = []

		const result = helper.mostBlogs(blogs)
		expect(result).toEqual({})
	})

	test('of a long list works', () => {
		const expected = {
			author: "Robert C. Martin",
  		blogs: 3
		}

		const result = helper.mostBlogs(blogs)
		expect(result).toEqual(expected)
	})

	test('works when multiple authors with most blogs', () => {
		const newBlogs = blogs.concat(blogs[2])
		expect(newBlogs.length).toBe(blogs.length + 1)

		const result = helper.mostBlogs(newBlogs)
		expect(["Edsger W. Dijkstra", "Robert C. Martin"]).toContain(result.author)
	})

})

describe('most likes', () => {

	test('of an empty list is {}', () => {
		const blogs = []

		const result = helper.mostLikes(blogs)
		expect(result).toEqual({})
	})

	test('of a long list works', () => {
		const expected = {
			author: "Edsger W. Dijkstra",
  		likes: 17
		}

		const result = helper.mostLikes(blogs)
		expect(result).toEqual(expected)
	})

	test('works when multiple authors with most blogs', () => {
		const newBlogs = blogs.concat(blogs[5])
		expect(newBlogs.length).toBe(blogs.length + 1)
		newBlogs[6].likes = 5

		const result = helper.mostLikes(newBlogs)
		expect(["Edsger W. Dijkstra", "Robert C. Martin"]).toContain(result.author)
	})

})
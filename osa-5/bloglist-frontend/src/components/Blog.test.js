import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog /> renders...', () => {

  let blog

  beforeEach(() => {
    blog = {
      title: 'Hurraa!',
      author: 'Bloggaaja Jei',
      url: 'hurraa.fi',
      likes: 13,
      user: {
        name: 'Blogin lisännyt käyttäjä',
        username: 'Avid-Reader',
        id: '1'
      }
    }

    const loggedInUser = {
      name: 'Kirjautunut Käyttäjä'
    }

    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<Blog blog={blog} user={loggedInUser} />)
  })

  test('title and author but not url and likes when not expanded', () => {
    screen.getByText(blog.title + ' by ' + blog.author, { exact: false })
    const url = screen.queryByText(blog.url)
    expect(url).toBeNull()
    const likes = screen.queryByText(blog.likes)
    expect(likes).toBeNull()
  })

  test('title, author, url and likes when expanded', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)

    screen.getByText(blog.title + ' by ' + blog.author, { exact: false })
    screen.getByText(blog.url, { exact: false })
    screen.getByText(blog.likes, { exact: false })
  })


})

describe('<Blog /> calls...', () => {

  test('callback function for likes when like-button clicked', async () => {
    const blog = {
      title: 'Hurraa!',
      author: 'Bloggaaja Jei',
      url: 'hurraa.fi',
      likes: 13,
      user: {
        name: 'Blogin lisännyt käyttäjä',
        username: 'Avid-Reader',
        id: '1'
      }
    }

    const loggedInUser = {
      name: 'Kirjautunut Käyttäjä'
    }

    const mockHandler = jest.fn()

    render(<Blog blog={blog} user={loggedInUser} likeBlog={mockHandler}/>)

    const user = userEvent.setup()
    const viewButton = screen.getByText('View')
    await user.click(viewButton)

    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<Blogform /> calls...', () => {

  test('callback function with correct information when new blog added', async () => {
    const mockHandler = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={mockHandler}/>)

    const inputTitle = screen.getByPlaceholderText('Title')
    const inputAuthor = screen.getByPlaceholderText('Author')
    const inputUrl = screen.getByPlaceholderText('Url')

    await userEvent.type(inputTitle, 'Hurraa!')
    await userEvent.type(inputAuthor, 'Bloggaaja Jei')
    await userEvent.type(inputUrl, 'hurraa.fi')

    const submitButton = screen.getByText('Add')
    await user.click(submitButton)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('Hurraa!')
    expect(mockHandler.mock.calls[0][0].author).toBe('Bloggaaja Jei')
    expect(mockHandler.mock.calls[0][0].url).toBe('hurraa.fi')
  })

})
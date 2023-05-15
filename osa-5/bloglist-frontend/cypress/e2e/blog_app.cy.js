describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
  })

  describe('Login',function() {

    beforeEach(function() {
      const user = {
        name: 'Misse Missenen',
        username: 'misse',
        password: 'silakka'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
    })

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('misse')
      cy.get('#password').type('silakka')
      cy.get('#login').click()

      cy.contains('Logged in as Misse Missenen')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('pupu')
      cy.get('#password').type('porkkana')
      cy.get('#login').click()

      cy.get('.error').contains('Wrong username or password.')
    })

  })

  describe('When logged in', function() {

    beforeEach(function() {
      const user = {
        name: 'Misse Missenen',
        username: 'misse',
        password: 'silakka'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.login({ username: 'misse', password: 'silakka' })
    })

    it('A blog can be created', function() {
      cy.contains('New blog').click()

      cy.get('#title').type('How to use Cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('blogi.fi')
      cy.get('#add-blog').click()

      cy.contains('How to use Cypress')
      cy.contains('Cypress')
    })

    describe('...and when a blog has been created',function() {

      beforeEach(function() {
        cy.createBlog({ title: 'How to use Cypress', author: 'Cypress', url: 'blogi.fi' })
      })

      it('A blog can be liked', function() {
        cy.contains('View').click()
        cy.contains('Likes: 0')
        cy.get('#like-button').click()
        cy.contains('Likes: 1')
      })

      it('A blog can be deleted by the user', function() {
        cy.contains('View').click()
        cy.contains('Delete').click()
        cy.contains('How to use Cypress').should('not.exist')
      })

    })

  })

  describe('Deletion',function() {

    it('The delete button is only shown to the user who created the blog', function() {
      // Let's create a new blog first
      const user = {
        name: 'Misse Missenen',
        username: 'misse',
        password: 'silakka'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.login({ username: 'misse', password: 'silakka' })
      cy.createBlog({ title: 'How to use Cypress', author: 'Cypress', url: 'blogi.fi' })
      cy.contains('Logout').click()


      // Then view it with another user
      const anotherUser = {
        name: 'Pupu Jussikainen',
        username: 'pupu',
        password: 'porkkana'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', anotherUser)
      cy.login({ username: 'pupu', password: 'porkkana' })
      cy.contains('View').click()

      // And make sure the delete button is not visible
      cy.get('#delete-button').should('have.css', 'display', 'none')
    })

  })

})
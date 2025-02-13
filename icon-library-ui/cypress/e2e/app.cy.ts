// https://on.cypress.io/api
import 'cypress-clipboard'

describe('Test the app overview', () => {
  it('visits the app root url', () => {
    cy.visit('/')
    cy.contains('Icon Library')
  })

  it('basic search', () => {
    cy.visit('/')
    cy.findByText('Arrows').should('exist')
    cy.findByText('Action & Interface').should('exist')
    cy.findByTestId('attachment').should('exist')
    cy.findByTestId('searchInput').type('bell')
    cy.findByText('Arrows').should('not.exist')
    cy.findByText('Action & Interface').should('exist')
    cy.findByTestId('bell').should('exist')
    cy.findByTestId('attachment').should('not.exist')
  })

  it('select icon -> open/close sidebar', () => {
    cy.visit('/')
    cy.findByTestId('iconSidebar').should('not.exist')
    cy.findByTestId('iconCard-attachment').click()
    cy.findByTestId('iconSidebar').should('exist')
    cy.findByTestId('iconCard-attachment').click()
    cy.findByTestId('iconSidebar').should('not.exist')
    cy.findByTestId('iconCard-attachment').click()
    cy.findByTestId('iconSidebar').should('exist')
    cy.findByTestId('closeBtn').click()
    cy.findByTestId('iconSidebar').should('not.exist')
  })
  it('copy icon name', () => {
    cy.visit('/')
    cy.findByTestId('iconCard-attachment').click()
    cy.findByTestId('copyNameBtn').click()
    cy.window()
      .its('navigator.clipboard')
      .invoke('readText')
      .then((text) => {
        cy.wrap(text).should('eq', 'attachment')
      })
  })
  it('download svg', () => {
    cy.visit('/')
    cy.findByTestId('iconCard-attachment').click()
    cy.findByTestId('downloadBtn').click()
    cy.readFile(`cypress/downloads/attachment.svg`).should('exist')
  })
})

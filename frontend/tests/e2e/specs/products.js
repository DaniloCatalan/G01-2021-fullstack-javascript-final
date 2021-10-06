describe('products test suite', () => {
  beforeEach(() => {
    cy.exec('cd ../backend && npx sequelize-cli db:seed:all --env development')
  })
  
  it('shows a list of products', () => {
    cy.login('test-e2e@boolean.cl', 'booleanacademia')

    cy.fixture('products.json')
      .then((products) => {
        cy.get('[data-cy="product-item"]').should('have.length', products.length)
      })
  })

  it('Eliminar producto', () => {
    cy.login('test-e2e@boolean.cl', 'booleanacademia')
    cy.remove()
    cy.get('[data-cy=btn-confirm]').click()
    cy.get('[data-cy=alert-eliminar]').should('include.text', 'Producto eliminado exitosamente')
  })

  it('Cancelar eliminar producto', () => {
    cy.login('test-e2e@boolean.cl', 'booleanacademia')
    cy.remove()
    cy.get('[data-cy=btn-cencelar]').click()
  })

})

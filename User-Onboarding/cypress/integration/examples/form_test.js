describe('Form inputs', () => {
    it('Navigates to App', () => {
        cy.visit('http://localhost:3000/')
        cy.url()
        .should('include', 'localhost')
    })

    it('Adds a Name', () => {
        cy.get('#name')
            .type('Angela')
            .should('have.value', 'Angela')
    })

    it('Adds a Email', () => {
        cy.get('#email')
            .type('agiulian73@gmail.com')
            .should('have.value', "agiulian73@gmail.com")
    })

    it('Adds a Password', () => {
        cy.get('#password')
            .type('password')
            .should('have.value', "password")
    })

    it('Checks Terms Box', () => {
        cy.get('#terms')
            .click()
    })

    it('Submits inputs', () => {
        cy.get('button.submit')
            .should('not.be.disabled')
    })
})

describe('wont submit with missing inputs', () => {
    it('wont submit when email is missing', () => {
        cy.visit('http://localhost:3000/')
        cy.get('#name').type('Angela')
        cy.get('#email').type('agiulian73@gmail.com')
        cy.get('#password').type('password123{enter}')
        cy.get('#terms').click()
        cy.get('button.submit').click()

    })
})

describe('Submit a user', () =>{
    it('can submit a user', () => {
        cy.visit('http://localhost:3000/')
        cy.get('#name').type('Angela')
        cy.get('#email').type('agiulian73@gmail.com')
        cy.get('#password').type('password123{enter}')
        cy.get('#terms').click()
        cy.get('button.submit').click()

    })
})
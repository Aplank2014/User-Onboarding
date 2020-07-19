describe('My First test', function () {
    //Arrange
    it ('not much', () => {
        //Act
        cy.visit('/Form')
        //Assert
        cy.get('form > :nth-child(1) > label > input')
        .type('Angela')
        .should('have.value','Angela')

        cy.get(':nth-child(2) > label > input')
        .type('agiulian73@gmail.com')
        .should('have.value','agiulian73@gmail.com')

        cy.get(':nth-child(3) > label > input')
        .type('password')
        .should('have.value','password')

        cy.get('[type="checkbox"]')  .check({ force: true }).should('be.checked')  

        cy.get('form').submit()
    })
})
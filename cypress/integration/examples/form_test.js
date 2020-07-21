describe('Form Test', function(){
    it ('tests the form for all parts', function(){
        cy.visit('http://localhost:3000');
        cy.get('#name').type('angela');
        cy.get('#email').type('agiulian@gmail.com');
        cy.get('#password').type('password');
        cy.get('#terms').check();
        cy.get('#submit').click();
       
    })
})
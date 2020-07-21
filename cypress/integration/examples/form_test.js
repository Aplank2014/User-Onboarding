describe('Form Test', function(){
    it ('tests the form for all parts', function(){
        cy.visit('http://localhost:3000');
        cy.get('input[name="name"]').type("Angela")
        cy.get('#email').type('agiulian@gmail.com');
        cy.get('#password').type('password');
        cy.get('#terms').check();
        cy.get('form').submit()
       
    })
})
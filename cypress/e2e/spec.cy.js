describe('spec', () => {
  it('test', () => {
    let items = [];
    cy.intercept('GET', '/list.json').as('list');
    cy.visit('https://demo-cypress.netlify.app');

    cy.wait('@list').then((interception) => {
      items = interception.response.body;
      for (let item of items) {
        cy.intercept('GET', '/' + item).as(item);
      }

      for (let item of items) {
        cy.wait('@' + item).then((interception) => {
          expect(interception.statusCode).to.eq(200);
        });
      }
    });
  })
})
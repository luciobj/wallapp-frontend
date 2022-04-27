describe('Tests the Main page if not logged in', () => {
  before(() => {
    cy.visit('/');
  });

  it('Does not show the add post it form, and edit/delete menu', () => {
    cy.get('.postit-form').should('not.exist');
    cy.get('.postit-container > :last-child() > .postit-header > .expand-menu > .MuiButton-root').should('not.exist');
  });
});

describe('Tests the Register page', () => {
  before(() => {
    cy.visit('/signup');
  });

  it('Shows success message in a correct new user register', () => {
    cy.get('#\\:r1\\:').clear();
    cy.get('#\\:r1\\:').type('user');
    cy.get('#\\:r3\\:').clear();
    cy.get('#\\:r3\\:').type('user@email.com');
    cy.get('#\\:r5\\:').clear();
    cy.get('#\\:r5\\:').type('123456');
    cy.get('#\\:r7\\:').clear();
    cy.get('#\\:r7\\:').type('123456');
    cy.get('.register-form > .MuiButton-root').click();
    cy.get('.MuiAlert-message').should('contain', 'A user with that username already exists.');
  })
  
  it('Shows an error with invalid credentials', () => {
    cy.intercept('POST', 'http://localhost:8000/users/', {
      statusCode: 201,
      body: {
        'id': '1',
      },
    });
    cy.get('#\\:r1\\:').clear();
    cy.get('#\\:r1\\:').type('newUser');
    cy.get('#\\:r3\\:').clear();
    cy.get('#\\:r3\\:').type('newuser@email.com');
    cy.get('#\\:r5\\:').clear();
    cy.get('#\\:r5\\:').type('123456');
    cy.get('#\\:r7\\:').clear();
    cy.get('#\\:r7\\:').type('123456');
    cy.get('.register-form > .MuiButton-root').click();
    cy.get('.MuiAlert-message').should('contain', 'Success! You are now registered');
  });
});

describe('Tests the Login page', () => {
  after(() => {
    cy.get('.header-links > .MuiButton-root').click();
  });

  it('Shows an error with invalid credentials', () => {
    cy.visit('/');
    cy.get('.header-links > :nth-child(1) > .link').click();
    cy.get('#\\:r1\\:').clear();
    cy.get('#\\:r1\\:').type('asd');
    cy.get('#\\:r3\\:').clear();
    cy.get('#\\:r3\\:').type('asdasd');
    cy.get('.login-form > .MuiButton-root').click();
    cy
  });
  it('Logs in successfully with correct credentials', () => {
    cy.visit('/');
    cy.get('.header-links > :nth-child(1) > .link').click();
    cy.get('#\\:r1\\:').clear();
    cy.get('#\\:r1\\:').type('newUser');
    cy.get('#\\:r3\\:').clear();
    cy.get('#\\:r3\\:').type('123456');
    cy.get('.login-form > .MuiButton-root').click();
    cy.url().should('include', '/');
    cy.get('.header-links > :nth-child(1)').should('contain', 'newUser');
    cy.get('.header-links > .MuiButton-root').should('exist');
  });
});

describe('Tests the Main page while logged in', () => {
  before(() => {
    cy.visit('/');
    cy.get('.header-links > :nth-child(1) > .link').click();
    cy.get('#\\:r1\\:').clear();
    cy.get('#\\:r1\\:').type('newUser');
    cy.get('#\\:r3\\:').clear();
    cy.get('#\\:r3\\:').type('123456');
    cy.get('.login-form > .MuiButton-root').click();
  });

  after(() => {
    cy.get('.header-links > .MuiButton-root').click();
  });

  it('Shows the add post it form, and you can use it', () => {
    cy.get('.postit-form').should('exist');
    cy.get('.postit-form > :nth-child(1)').click();
    cy.get('.postit-form > :nth-child(1)').clear();
    cy.get('.postit-form > :nth-child(1)').type('Test Post it');
    cy.get('.postit-form > :nth-child(2)').clear();
    cy.get('.postit-form > :nth-child(2)').type('This is a test post it!');
    cy.get('.postit-form > .MuiButton-root').click();
    cy.get('.postit-container > :last-child() > .postit-text > h4').should('contain', 'Test Post it');
    cy.get('.postit-container > :last-child() > .postit-text > p').should('contain', 'This is a test post it!');
  });

  it('Shows the post it menu, and you can use it to edit and delete a post it', () => {
    cy.get('.postit-container > :last-child() > .postit-header > .expand-menu').should('exist');
    cy.get('.postit-container > :last-child() > .postit-header > .expand-menu > .MuiButton-root').click();
    cy.get('.MuiList-root > [tabindex="0"]').click();
    cy.get('.postit-form > :nth-child(1)').click();
    cy.get('.postit-form > :nth-child(1)').clear();
    cy.get('.postit-form > :nth-child(1)').type('Test Post it edited');
    cy.get('.postit-form > :nth-child(2)').clear();
    cy.get('.postit-form > :nth-child(2)').type('This is a edited test post it!');
    cy.get('.postit-form > .MuiButton-root').click();
    cy.get('.postit-container > :last-child() > .postit-text > h4').should('contain', 'Test Post it edited');
    cy.get('.postit-container > :last-child() > .postit-text > p').should('contain', 'This is a edited test post it!');
    cy.get('.postit-container > :last-child() > .postit-header > .expand-menu > .MuiButton-root').click();
    cy.get('.MuiList-root > [tabindex="-1"]').click();
  });
});

describe("Contact Form", () => {
  beforeEach(() => cy.visit("/services"));

  it("submits", () => {
    cy.getByData("name-input").type("John Smith");
    cy.getByData("email-input").type("johnsmith@gmail.com");
    cy.getByData("message-textarea").type("This is a message.");
    cy.getByData("submit-button").click();
  });

  it("doesn't submit without name", () => {
    cy.getByData("email-input").type("johnsmith");
    cy.getByData("message-textarea").type("This is a message.");
    cy.getByData("submit-button").click();

    cy.get('input[data-testid="name-input"]:invalid').should("have.length", 1);
    cy.getByData("name-input").then(($input) => {
      expect($input[0].validationMessage).to.eq("Please fill in this field.");
    });
  });

  it("doesn't submit without email", () => {
    cy.getByData("name-input").type("John Smith");
    cy.getByData("message-textarea").type("This is a message.");
    cy.getByData("submit-button").click();

    cy.get('input[data-testid="email-input"]:invalid').should("have.length", 1);
    cy.getByData("email-input").then(($input) => {
      expect($input[0].validationMessage).to.eq("Please fill in this field.");
    });
  });

  it("doesn't submit without valid email", () => {
    cy.getByData("name-input").type("John Smith");
    cy.getByData("email-input").type("johnsmith");
    cy.getByData("message-textarea").type("This is a message.");
    cy.getByData("submit-button").click();

    cy.get('input[data-testid="email-input"]:invalid').should("have.length", 1);
    cy.getByData("email-input").then(($input) => {
      expect($input[0].validationMessage).to.eq(
        "Please include an '@' in the email address. 'johnsmith' is missing an '@'.",
      );
    });
  });

  it("doesn't submit without message", () => {
    cy.getByData("name-input").type("John Smith");
    cy.getByData("email-input").type("johnsmith@gmail.com");
    cy.getByData("submit-button").click();

    cy.get('textarea[data-testid="message-textarea"]:invalid').should(
      "have.length",
      1,
    );
    cy.getByData("message-textarea").then(($input) => {
      expect($input[0].validationMessage).to.eq("Please fill in this field.");
    });
  });
});

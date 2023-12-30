it("index heading is correct", () => {
  cy.visit("/");

  cy.get("h1").should("have.text", "Hi, I'm Alex.");
});

it("LinkedIn link opens", () => {
  cy.visit("/");

  cy.get('footer a[href="https://www.linkedin.com/in/anguyennz/"]')
    .should("be.visible")
    .click();
});

it("X link opens", () => {
  cy.visit("/");

  cy.get('footer a[href="https://twitter.com/anguyendev"]')
    .should("be.visible")
    .click();
});

it("GitHub link opens", () => {
  cy.visit("/");

  cy.get('footer a[href="https://github.com/alexnguyennz"]')
    .should("be.visible")
    .click();
});

it("last updated date displays", () => {
  cy.visit("/");

  cy.get("astro-updated span").should("contain.text", "🛠️ Updated");
});

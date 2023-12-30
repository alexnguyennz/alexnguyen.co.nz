it("theme toggles", () => {
  cy.visit("/");

  cy.get("header button#theme-toggle")
    .should("be.visible")
    .click()
    .get("html.dark");
});

it("desktop menu navigation links work", () => {
  cy.visit("/");

  cy.get("header nav a").each((page) => cy.request(page.prop("href")));
});

it("mobile menu toggles and navigation links work", () => {
  cy.visit("/");

  cy.viewport("iphone-6")
    .get("header button#mobile-toggle")
    .should("be.visible")
    .click()
    .get("header #mobile-menu")
    .should("be.visible")
    .get("header #mobile-menu a")
    .each((page) => cy.request(page.prop("href")));
});

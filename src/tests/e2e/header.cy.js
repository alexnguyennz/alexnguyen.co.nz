describe("Header", () => {
  beforeEach(() => cy.visit("/"));

  it("desktop menu navigation links work", () => {
    cy.getByData("header-nav")
      .find("a")
      .each((page) => cy.request(page.prop("href")));
  });

  it("mobile menu toggles and navigation links work", () => {
    cy.viewport("iphone-6")
      .getByData("mobile-toggle")
      .should("be.visible")
      .click()
      .getByData("mobile-menu")
      .should("be.visible")
      .get("header #mobile-menu a")
      .each((page) => cy.request(page.prop("href")));
  });
});

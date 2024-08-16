describe("Footer", () => {
  beforeEach(() => cy.visit("/"));

  it("LinkedIn link opens", () => {
    cy.getByData("footer")
      .find('a[href="https://www.linkedin.com/in/anguyennz/"]')
      .should("be.visible")
      .click()
      .url();
  });

  it("X link opens", () => {
    cy.getByData("footer")
      .find('a[href="https://twitter.com/anguyendev"]')
      .should("be.visible")
      .click();
  });

  it("GitHub link opens", () => {
    cy.getByData("footer")
      .find('a[href="https://github.com/alexnguyennz"]')
      .should("be.visible")
      .click();
  });

  it("theme toggles", () => {
    cy.getByData("theme-toggle").should("be.visible").click().get("html.dark");
  });
});

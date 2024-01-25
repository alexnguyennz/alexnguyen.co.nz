describe("Search", () => {
  beforeEach(() => cy.visit("/search"));

  it("returns results and opens result", () => {
    cy.getByData("search")
      .type("astro")
      .getByData("search-results")
      .find("a")
      .first()
      .click();
  });
});

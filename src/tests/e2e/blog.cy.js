describe("Blog", () => {
  it("open blog post", () => {
    cy.visit("/blog");

    cy.getByData("blog-posts").find("a").first().click();
  });

  it("navigate with table of contents", () => {
    cy.visit("/blog/all-about-astro");

    cy.viewport(1024, 768);
    cy.getByData("toc").find("a").last().click();
  });
});

describe("template spec", () => {
  it("passes", () => {
    cy.visit("https://example.cypress.io");
  });
});

describe("HULFT.comのトップページ", () => {
  it("右上に検索ボックスが存在する", () => {
    cy.visit("https://www.hulft.com");

    cy.get('[type="text"]').should("exist");
  });
});

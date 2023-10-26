describe("My First Test", () => {
  it("Correct test", () => {
    cy.visit("http://localhost:3000/login");
    cy.get("#input-email").type("test@test.com");
    cy.get("#input-password").type("test");
    cy.get("#input-button").click();
  });
  it("Incorrect test", () => {
    cy.visit("http://localhost:3000/login");
    cy.get("#input-email").type("test");
    cy.get("#input-password").type("test");
    cy.get("#input-button").click();
  });
  it("Incorrect test", () => {
    cy.visit("http://localhost:3000/login");
    cy.get("#input-email").type("test");
    cy.get("#input-password").type(
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    );
    cy.get("#input-button").click();
  });
});

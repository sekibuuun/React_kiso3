describe("My First Test", () => {
  it("Correct test", () => {
    cy.visit("http://localhost:3000/login");
    cy.get("#input-email").type("test@test.com");
    cy.get("#input-password").type("test");
    cy.get("#input-button").click();
    cy.url().should("equal", "http://localhost:3000/");
  });
  it("Incorrect test", () => {
    cy.visit("http://localhost:3000/login");
    cy.get("#input-email").type("test");
    cy.get("#input-password").type("test");
    cy.get("#input-button").click();
    cy.get(".email-error").should(
      "have.text",
      "メールアドレスの形式で入力してください。"
    );
  });
  it("Incorrect test", () => {
    cy.visit("http://localhost:3000/login");
    cy.get("#input-email").type("test");
    cy.get("#input-password").type(
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    );
    cy.get("#input-button").click();
    cy.get(".email-error").should(
      "have.text",
      "メールアドレスの形式で入力してください。"
    );
    cy.get(".password-error").should(
      "have.text",
      "パスワードは20文字以内で入力してください。"
    );
  });
});

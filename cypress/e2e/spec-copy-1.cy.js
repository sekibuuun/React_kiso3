describe("My First Test", () => {
  it("Correct test", () => {
    cy.visit("http://localhost:3000"); // または http://localhost:3000 など

    cy.get("#input-email").type("test@test.com"); // ABC と入力する
    cy.get("#input-button").click(); // ボタンを押す
    cy.get("#result").should("have.text", "test@test.com"); // 出力をチェックする
    cy.get("#input-email").should("have.value", "test@test.com"); // input タグの場合
  });

  it("Incorrect test", () => {
    cy.visit("http://localhost:3000"); // または http://localhost:3000 など

    cy.get("#input-email").type("test"); // ABC と入力する
    cy.get("#input-button").click(); // ボタンを押す
    cy.get("#result").should("have.text", "エラー"); // 出力をチェックする
    cy.get("#input-email").should("have.value", "test"); // input タグの場合
  });

  it("Incorrect test", () => {
    cy.visit("http://localhost:3000"); // または http://localhost:3000 など

    cy.get("#input-email").type("test@test"); // ABC と入力する
    cy.get("#input-button").click(); // ボタンを押す
    cy.get("#result").should("have.text", "エラー"); // 出力をチェックする
    cy.get("#input-email").should("have.value", "test@test"); // input タグの場合
  });
});

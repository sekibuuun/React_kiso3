import { render, screen } from "@testing-library/react";
import Header from "./components/Header";

describe("App", () => {
  test("ログイン画面のコンポーネント", () => {
    render(<Header />);
    const inputEmailLabel = screen.getByLabelText("メールアドレス");
    const inputEmail = screen.getByRole("textbox", { name: "メールアドレス" });
    const inputPasswordLabel = screen.getByLabelText("パスワード");
    const inputPassword = screen.getByLabelText("パスワード");
    const inputButton = screen.getByRole("button", { name: "送信" });
    expect(inputEmailLabel).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPasswordLabel).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(inputButton).toBeInTheDocument();
  });
});

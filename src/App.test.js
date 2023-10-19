import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("ログイン画面のコンポーネント", () => {
    render(<App />);
    const inputEmailLabel = screen.getByLabelText("メールアドレス");
    const inputEmail = screen.getByRole("textbox", { name: "メールアドレス" });
    const inputButton = screen.getByRole("button", { name: "送信" });
    const result = screen.getByText("未入力");
    expect(inputEmailLabel).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputButton).toBeInTheDocument();
    expect(result).toBeInTheDocument();
  });
});

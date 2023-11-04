import { render, screen } from "@testing-library/react";
import { LogIn } from "./components/LogIn";
import { store } from "./store";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from "react-router-dom";

describe("Login", () => {
  test("ログイン画面のコンポーネント", () => {
    render(
      <Provider store={store}>
        <CookiesProvider>
          <BrowserRouter>
            <LogIn />
          </BrowserRouter>
        </CookiesProvider>
      </Provider>
    );
    const inputEmailLabel = screen.getByLabelText("メールアドレス");
    const inputEmail = screen.getByRole("textbox", { name: "メールアドレス" });
    const inputPasswordLabel = screen.getByLabelText("パスワード");
    const inputPassword = screen.getByTestId("password");
    const inputButton = screen.getByRole("button", { name: "サインイン" });
    expect(inputEmailLabel).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPasswordLabel).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(inputButton).toBeInTheDocument();
  });
});

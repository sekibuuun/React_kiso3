import React, { useState } from "react";

function App() {
  const [inputEmail, setInputEmail] = useState("");
  const [result, setResult] = useState("未入力");

  const onButton = () => {
    if (inputEmail === "") {
      setResult("未入力");
      return;
    }
    if (!inputEmail.match(/.+@.+\..+/)) {
      setResult("エラー");
      return;
    }
    setResult(inputEmail);
  };

  return (
    <div>
      <label htmlFor="input-email">メールアドレス</label>
      <input
        type="email"
        id="input-email"
        required
        value={inputEmail}
        onChange={(e) => setInputEmail(e.target.value)}
      />
      <input type="button" id="input-button" value="送信" onClick={onButton} />
      <div id="result">{result}</div>
    </div>
  );
}

export default App;

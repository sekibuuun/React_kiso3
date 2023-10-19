import React, { useState } from "react";

function App() {
  const [inputEmail, setInputEmail] = useState("");
  const [result, setResult] = useState("未入力");

  const onButton = () => {
    if (inputEmail === "") {
      setResult("エラー");
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
      <input
        type="email"
        id="input-email"
        required
        value={inputEmail}
        onChange={(e) => setInputEmail(e.target.value)}
      />
      <input type="button" id="input-button" value="入力" onClick={onButton} />
      <div id="result">{result}</div>
    </div>
  );
}

export default App;

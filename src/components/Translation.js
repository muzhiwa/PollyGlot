import React, { useState } from "react";

function TranslatorForm({ onTranslate }) {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("French");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onTranslate(text, language);
  };

  return (
    <div className="form-container">
      <h1>PollyGlot</h1>
      <form onSubmit={handleSubmit}>
        <label>Text to translate:</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here..."
        />

        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="French"
              checked={language === "French"}
              onChange={(e) => setLanguage(e.target.value)}
            />
            French
          </label>
          <label>
            <input
              type="radio"
              value="Spanish"
              checked={language === "Spanish"}
              onChange={(e) => setLanguage(e.target.value)}
            />
            Spanish
          </label>
          <label>
            <input
              type="radio"
              value="Japanese"
              checked={language === "Japanese"}
              onChange={(e) => setLanguage(e.target.value)}
            />
            Japanese
          </label>
        </div>

        <button type="submit">Translate</button>
      </form>
    </div>
  );
}

export default TranslatorForm;

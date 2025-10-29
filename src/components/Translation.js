import React, { useState } from "react";
import OpenAI from "openai";

function Translation() {
  const [originalText, setOriginalText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [language, setLanguage] = useState("spanish");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTranslate = async (e) => {
    e.preventDefault();

    if (!originalText.trim()) {
      setError("Please enter some text to translate.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const client = new OpenAI({
        apiKey: process.env.REACT_APP_GROQ_API_KEY,
        baseURL: "https://api.groq.com/openai/v1",
        dangerouslyAllowBrowser: true,
      });

      const response = await client.chat.completions.create({
        model: "openai/gpt-oss-20b",
        messages: [
          {
            role: "system",
            content:
              "You are a translation assistant. Only return the translated text. No explanations or extra words.",
          },
          {
            role: "user",
            content: `Translate the following text to ${language}: ${originalText}`,
          },
        ],
      });

      const translation =
        response.choices?.[0]?.message?.content ||
        "⚠️ Error: No translation returned.";

      setTranslatedText(translation);
    } catch (err) {
      console.error("Translation error:", err);
      setError(
        "⚠️ Could not fetch translation. Check your API key or network."
      );
    } finally {
      setLoading(false);
    }
  };
  const handleReset = () => {
    setOriginalText("");
    setTranslatedText("");
    setError("");
  };

  const getFlag = () => {
    switch (language) {
      case "french":
        return "🇫🇷";
      case "spanish":
        return "🇪🇸";
      case "japanese":
        return "🇯🇵";
      default:
        return "🇪🇸";
    }
  };

  return (
    <div className="app-container">
      <div className="container">
        <div className="header">
          <h1>
            <i className="fas fa-language"></i> PollyGlot
          </h1>
          <p>AI-powered translation in seconds</p>
        </div>

        <div className="content">
          {!translatedText ? (
            <form onSubmit={handleTranslate}>
              <div className="input-group">
                <label htmlFor="text-to-translate">Text to translate</label>
                <textarea
                  id="text-to-translate"
                  className="input-field"
                  placeholder="Enter text to translate..."
                  value={originalText}
                  onChange={(e) => setOriginalText(e.target.value)}
                />
              </div>

              <div className="language-selector">
                <h3>Select target language</h3>
                <div className="languages">
                  <div className="language-option">
                    <input
                      type="radio"
                      id="french"
                      name="language"
                      value="french"
                      checked={language === "french"}
                      onChange={() => setLanguage("french")}
                    />
                    <label htmlFor="french">
                      <i className="fas fa-flag"></i>
                      <span>French</span>
                    </label>
                  </div>
                  <div className="language-option">
                    <input
                      type="radio"
                      id="spanish"
                      name="language"
                      value="spanish"
                      checked={language === "spanish"}
                      onChange={() => setLanguage("spanish")}
                    />
                    <label htmlFor="spanish">
                      <i className="fas fa-flag-usa"></i>
                      <span>Spanish</span>
                    </label>
                  </div>
                  <div className="language-option">
                    <input
                      type="radio"
                      id="japanese"
                      name="language"
                      value="japanese"
                      checked={language === "japanese"}
                      onChange={() => setLanguage("japanese")}
                    />
                    <label htmlFor="japanese">
                      <i className="fas fa-flag"></i>
                      <span>Japanese</span>
                    </label>
                  </div>
                </div>
              </div>

              {error && <div className="error-message">{error}</div>}

              <button
                type="submit"
                className="btn-translate"
                disabled={loading}
              >
                <i className="fas fa-paper-plane"></i> Translate
              </button>
            </form>
          ) : (
            <div className="results">
              <div className="result-item">
                <h3>Original text</h3>
                <div className="translation-box">{originalText}</div>
              </div>

              <div className="result-item">
                <h3>Your translation</h3>
                <div className="translation-box">{translatedText}</div>
              </div>

              <div className="flags">
                <div className="flag">🇺🇸</div>
                <div className="flag">➡️</div>
                <div className="flag">{getFlag()}</div>
              </div>

              <button className="btn-start-over" onClick={handleReset}>
                <i className="fas fa-redo"></i> Start Over
              </button>
            </div>
          )}

          {loading && (
            <div className="loader">
              <div className="spinner"></div>
              <p>Translating...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Translation;

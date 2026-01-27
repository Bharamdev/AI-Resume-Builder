import { OPENROUTER_API_KEY, LLM_MODEL } from "../config/config";

// Validate API key
if (!OPENROUTER_API_KEY) {
  console.error(
    "❌ OPENROUTER_API_KEY is missing! Please set VITE_OPENROUTER_API_KEY in your .env file"
  );
  throw new Error(
    "OpenRouter API key is not configured. Please set VITE_OPENROUTER_API_KEY in your Frontend/.env file"
  );
}

// Log API key status (only first few chars for security)
if (import.meta.env.DEV) {
  console.log(
    "✅ OpenRouter API Key loaded:",
    OPENROUTER_API_KEY ? `${OPENROUTER_API_KEY.substring(0, 10)}...` : "NOT FOUND"
  );
}

const apiKey = OPENROUTER_API_KEY;
const model = LLM_MODEL || "openrouter/auto";

// OpenRouter API handler
export const generateWithOpenRouter = async (prompt) => {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": window.location.origin,
        },
        body: JSON.stringify({
          model: model,
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 1,
          max_tokens: 8192,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "API request failed");
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("OpenRouter API Error:", error);
    throw error;
  }
};

// Create a compatible chat session object
export const AIChatSession = {
  sendMessage: async (prompt) => {
    const response = await generateWithOpenRouter(prompt);
    return {
      response: {
        text: () => response,
      },
    };
  },
};

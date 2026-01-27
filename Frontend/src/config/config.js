const AUTH_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;
// OpenRouter API key
// Make sure you have VITE_OPENROUTER_API_KEY defined in your Frontend/.env
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const LLM_MODEL = import.meta.env.VITE_LLM_MODEL;
const VITE_APP_URL = import.meta.env.VITE_APP_URL;

export { AUTH_KEY, API_KEY, OPENROUTER_API_KEY, LLM_MODEL, VITE_APP_URL };

import dotenv from 'dotenv';
dotenv.config({ path: '.getconfig' });

if (!process.env.OPENAI_API_KEY) {
  console.error('No OpenAI API Key found. Please run `cs config -k <key>` to set your API key.');
  process.exit(1);
}

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
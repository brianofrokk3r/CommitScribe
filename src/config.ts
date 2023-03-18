import dotenv from 'dotenv';
import { homedir } from 'os';
dotenv.config({ path: homedir() + '/.getconfig' });

if (!process.env.OPENAI_API_KEY) {
  console.error('No OpenAI API Key found. Please run `cs config -k <key>` to set your API key.');
  process.exit(1);
}

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
import axios from 'axios';
import { OPENAI_API_KEY } from './config';

export async function generateCommitSummary(log: string) {
  let fullPrompt = `You are a helpful assistant. Your audience is the product team. Give me a set of sub-lists broken into feature, fix, chore, refactor, etc... based on the commit logs provided. Append after each Section title the % of items in that section. If there's nothing in a section don't put it in the result. Remove words like fix, style, chore, refactor from the front of the items, and just put a section head and group the items in each section.
    
The format I would like is...

emoji Feature (20%):
- Feature 1 description
- Feature 2 description
- etc...` + '\n\n-----\n\n' + log;

  const completion = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: fullPrompt }],
      temperature: 0.1,
    },
    {
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
    }
  );
  return completion;
}
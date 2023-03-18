import axios from 'axios';
import { OPENAI_API_KEY } from './config';

export async function generateCommitSummary(log: string) {
  let fullPrompt = `System: 

    Give me a set of lists broken into feature, fix, chore, refactor, etc... Use emojis like stars emoji for feature, the caterpillar for fix, and the package for chore. Format each item into a new line to make it more readable result. Append after each Section title the % of items in that section. If there's nothing in a section don't put it in the result.
    
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
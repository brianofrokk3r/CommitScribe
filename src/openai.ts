import axios from 'axios';
import { OPENAI_API_KEY } from './config';

export async function generateCommitSummary(log: string, promptType: string = 'weekly') {

  let fullPrompt = ``;

  switch (promptType) {
    case 'weekly':
      fullPrompt = `You are a helpful assistant. Your audience is the product team. Give me a set of sub-lists broken into feature, fix, chore, refactor, etc... based on the commit logs provided. Append after each Section title the % of items in that section. If there's nothing in a section don't put it in the result. Remove words like fix, style, chore, refactor from the front of the items, and just put a section head and group the items in each section.
    
The format I would like is...
emoji Feature (20%):
- Feature 1 description
- Feature 2 description
- etc...` + '\n\n-----\n\n' + log;
      break;
    case 'between':
      fullPrompt = `You are a helpful assistant. Your audience is the product team. You are tasked to generate a summary based on the content provided.
  
Here are the guidelines to follow.
- Break down logs provided below into set of sub-lists broken into feature, fix, chore, refactor, and docs.
- Use 🐛 for fix, 📦 for chore, 🔨for refactor, ✨ for feature, and 📝 for docs. Append after each Section title the % of items in that section. Group sections with the same title.
- If there is nothing in a section don't put it in the result. 
- If there is nothing to summarize, do not respond with anything.
- If there is a version number, do not try to make up version details from your own knowledge.
- Ignore versions, just focus on the logs.
  
Here are the logs:
  
${log}`;
      break;
    default:
      fullPrompt = `You are a helpful assistant. Your audience is the product team. You are tasked to generate a summary based on the content provided.`;
  }

  console.log(promptType, fullPrompt);

  const completion = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo-0301',
      messages: [{ role: 'user', content: fullPrompt }],
      temperature: 0,
      presence_penalty: 2,
    },
    {
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
    }
  );
  return completion;
}
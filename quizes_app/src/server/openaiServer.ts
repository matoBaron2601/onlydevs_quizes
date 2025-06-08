import axios from 'axios';
import { config } from 'dotenv';

config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL =
  process.env.OPENAI_API_URL || 'https://api.openai.com/v1/chat/completions';
const OPENAI_API_MODEL = process.env.OPENAI_API_MODEL || 'gpt-4o-mini';

if (!OPENAI_API_KEY) {
  throw new Error('No OpenAI API key found in environment variables');
}

export async function generateCompletionV1(
  prompt: string
): Promise<OpenAIChatCompletionResponse> {
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
    },
    {
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
}

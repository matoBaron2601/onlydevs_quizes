import Elysia from 'elysia';
import { Ollama } from 'ollama';

export const ollamaApi = new Elysia().get('ollama', async (context) => {
  console.log("HERE")
  return await main();
});

async function main() {
  const ollama = new Ollama();
  console.log("olama generated")
  const response = await ollama.generate({
    model: 'llama3.2',
    prompt: 'Ansewer me in one work. "HI"',
  });
  console.log("response", response)
  return response.response

}


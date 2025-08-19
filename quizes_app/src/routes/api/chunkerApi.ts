import Elysia from 'elysia';
import { createQuizSchema } from '../../schemas/quizSchemas';
import { createQuizV1 } from '../../server/quizServer';
import chunkFile from '../../server/chunkerServer';

const chunkerApi = new Elysia().post('chunker', async (context) => {
  console.log('GOT HERE');
  const body = context.body as { file?: File }; // Type assertion for body
  const file = body.file; // Access the file from the body
  if (!file) {
    return;
  }
  await chunkFile(file);
});

export default chunkerApi;

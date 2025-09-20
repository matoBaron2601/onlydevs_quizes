import Elysia from 'elysia';
import chunkFile from '../../server/chunkerServer';
import { populateCollection } from '../../server/typesenseServer';

const chunkerApi = new Elysia().post('chunker', async (context) => {
  const body = context.body as { file?: File };
  const file = body.file;
  if (!file) {
    return;
  }
  const chunksFromFile = await chunkFile(file);
  return "Chunks populated successfully";
});

export default chunkerApi;

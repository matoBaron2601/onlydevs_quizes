import Elysia from 'elysia';
import chunkFile from '../../server/chunkerServer';
import { populateCollectionV1 } from '../../typesense/v1';
import { getDocumentsV1 } from '../../server/typesenseServer';

const chunkerApi = new Elysia().post('chunker', async (context) => {
  const body = context.body as { file?: File };
  const file = body.file;
  if (!file) {
    return;
  }
  const chunksFromFile = await chunkFile(file);
  const a = await populateCollectionV1(chunksFromFile);
  console.log('Chunks populated:', a);
});

export default chunkerApi;

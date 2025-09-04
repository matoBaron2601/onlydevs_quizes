import Elysia from 'elysia';
import { createQuizSchema } from '../../schemas/quizSchemas';
import testjson from '../../typesense/v1/data/test.json';
import {
  createCollectionV1,
  deleteCollectionV1,
  populateCollectionV1,
} from '../../typesense/v1';
import {
  getCollectionDocuments,
  getCollections,
} from '../../server/typesenseServer';
import { CollectionName } from '../../typesense/types';

export const typesenseApi = new Elysia()
  .get('typesense/collections', getCollections)
  .post('typesense/v1/createCollection', async () => {
    return await createCollectionV1();
  })

  .delete('typesense/v1/deleteCollection', async () => {
    return await deleteCollectionV1();
  })
  .get('typesense/v1/getCollectionDocuments', async () => {
    return await getCollectionDocuments(CollectionName.collectionV1);
  })
  .post('typesense/v1/populateCollection', async () => {
    // return await populateCollectionV1(await chunkFile(['']));
  })
  .post('typesense/v1/populateDefaultDocuments', async ({ body }) => {
    const content: string[] = testjson.content;
    return await populateCollectionV1(content);
  });

import Elysia from 'elysia';
import { createQuizSchema } from '../../schemas/quizSchemas';
import { createCollectionV1, deleteCollectionV1, populateCollectionV1 } from '../../typesense/v1';
import { getCollections } from '../../server/typesenseServer';

export const typesenseApi = new Elysia()
  .get('typesense/collections', getCollections)
  .post('typesense/v1/createCollection', async () => {
    return await createCollectionV1();
  })
  .delete('typesense/v1/deleteCollection', async () => {
    return await deleteCollectionV1();
  })
  // .post('typesense/v1/populateCollection', async () => {
  //   return await populateCollectionV1();
  // })

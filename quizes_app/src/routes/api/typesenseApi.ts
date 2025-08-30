import Elysia from 'elysia';
import { createQuizSchema } from '../../schemas/quizSchemas';
import {
  createCollectionV1,
  deleteCollectionV1,
  populateCollectionV1,
} from '../../typesense/v1';
import { getAllDocuments, getCollections } from '../../server/typesenseServer';
import { CollectionName } from '../../typesense/types';
import fs from 'fs';
import path from 'path';
import file from '../../../public/react_bok_extracted.txt'

export const typesenseApi = new Elysia()
  .get('typesense/collections', getCollections)
  .post('typesense/v1/createCollection', async () => {
    return await createCollectionV1();
  })

  .delete('typesense/v1/deleteCollection', async () => {
    return await deleteCollectionV1();
  })
  .get('typesense/v1/getCollectionDocuments', async () => {
    return await getAllDocuments(CollectionName.collectionV1);
  })
  .post('typesense/v1/populateCollection', async () => {
    // return await populateCollectionV1(await chunkFile(['']));
  });

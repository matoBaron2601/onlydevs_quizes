import Elysia from 'elysia';
import {
  createCollection,
  deleteCollection,
  getCollection,
  populateCollection,
  getCollectionDocuments,
  getUniqueTechnologies,
} from '../../server/typesenseServer';
import { CollectionName } from '../../typesense/types';
import reactDocument from '../../typesense/v1/data/react_document.json';
export const typesenseApi = new Elysia()
  .get('typesense/default/collection', async () => {
    return await getCollection();
  })
  .post('typesense/default/createCollection', async () => {
    return await createCollection();
  })

  .delete('typesense/default/deleteCollection', async () => {
    return await deleteCollection();
  })

  .post('typesense/default/populateCollection', async () => {
    return await populateCollection({
      contentChunks: reactDocument.content,
      is_default: true,
      technology: ['react'],
      source_file: 'source_file',
    });
  })
  .get('typesense/default/getUniqueTechnologies', async () => {
    return await getUniqueTechnologies(CollectionName.collectionV1, true);
  })
  .get('typesense/custom/getUniqueTechnologies', async () => {
    return await getUniqueTechnologies(CollectionName.collectionV1, false);
  });

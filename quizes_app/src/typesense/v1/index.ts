import {
  createCollection,
  deleteCollection,
  populateCollection,
} from '../../server/typesenseServer';
import { CollectionName } from '../types';
import schema from './schema.json';

export const createCollectionV1 = async () => {
  return await createCollection(schema);
};

export const deleteCollectionV1 = async () => {
  return await deleteCollection(CollectionName.collectionV1);
};

export const populateCollectionV1 = async (chunks: string[]) => {
  return await populateCollection(CollectionName.collectionV1, chunks);
};

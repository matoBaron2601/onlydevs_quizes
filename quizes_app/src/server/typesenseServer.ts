import type { SearchResponse } from 'typesense/lib/Typesense/Documents';
import typesenseClient from '../typesense/client';
import { CollectionName } from '../typesense/types';

export const getDocumentsV1 = async (
  tags: string[]
): Promise<SearchResponse<object>> => {
  const searchParameters = {
    q: tags.join(' '),
    query_by: 'content',
    sort_by: '_text_match:desc',
  };

  return await typesenseClient
    .collections(CollectionName.collectionV1)
    .documents()
    .search(searchParameters);
};

export const populateCollection = async (
  collectionName: CollectionName,
  chunks: string[]
) => {

  for (const chunk of chunks) {
    const a = await typesenseClient.collections(collectionName).documents().create({
      "content": chunk,
    });
    console.log(a)
  }
};

export const getCollections = async () => {
  const collections = await typesenseClient.collections().retrieve();
  return collections;
};

export const createCollection = async (schema: any) => {
  const newCollection = await typesenseClient.collections().create(schema);
  return newCollection;
};

export const deleteCollection = async (collectionName: CollectionName) => {
  const response = await typesenseClient.collections(collectionName).delete();
  return response;
};

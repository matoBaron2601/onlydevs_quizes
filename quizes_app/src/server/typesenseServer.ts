import type { SearchResponse } from 'typesense/lib/Typesense/Documents';
import typesenseClient from '../typesense/client';
import { CollectionName } from '../typesense/types';
import { promises as fs } from 'fs';
import path from 'path';
import { getAllFiles, loadJsonFile } from './utils';

export const getDocumentsV1 = async (
  tags: string[]
): Promise<SearchResponse<object>> => {
  const searchParameters = {
    q: '*',
    query_by: 'tags',
    filter_by: `tags:={${tags.join(',')}}`,
    sort_by: '_text_match:desc',
  };

  return await typesenseClient
    .collections(CollectionName.collectionV1)
    .documents()
    .search(searchParameters);
};

export const populateCollection = async (
  collectionName: CollectionName,
  path: string
) => {
  const files = await getAllFiles(path);
  const jsonData = await Promise.all(
    files.map(async (file) => {
      if (file.endsWith('.json')) {
        const data = await loadJsonFile(file);
        return data;
      }
      return null;
    })
  );
  const loadedJsonData = jsonData.filter((data) => data !== null);

  for (const data of loadedJsonData) {
    return await typesenseClient.collections(collectionName).documents().create(data);
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

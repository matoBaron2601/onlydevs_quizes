import type { SearchResponse } from 'typesense/lib/Typesense/Documents';
import typesenseClient from '../typesense/client';
import { CollectionName } from '../typesense/types';
import schema from '../typesense/v1/schema.json';
import type { UniqueTechnologies } from '../routes/dataset/common/types';

export const getCollection = async () => {
  const collections = await typesenseClient.collections().retrieve();
  return collections;
};

export const createCollection = async () => {
  const newCollection = await typesenseClient
    .collections()
    .create(schema as any);
  return newCollection;
};

export const deleteCollection = async () => {
  const response = await typesenseClient
    .collections(CollectionName.collectionV1)
    .delete();
  return response;
};

type PopulateCollectionProps = {
  contentChunks: string[];
  is_default: boolean;
  technology: string[];
  source_file: string;
};

export const populateCollection = async ({
  contentChunks,
  is_default,
  technology,
  source_file,
}: PopulateCollectionProps) => {
  for (const content of contentChunks) {
    await typesenseClient
      .collections(CollectionName.collectionV1)
      .documents()
      .create({
        content,
        is_default,
        technology,
        source_file,
      });
  }
  return { message: 'Collection populated' };
};

export const getUniqueTechnologies = async (
  collectionName: CollectionName,
  onlyDefault: boolean
): Promise<UniqueTechnologies> => {
  if ((await getCollection()).length === 0) {
    return [];
  }

  const searchParameters = {
    q: '*',
    query_by: 'technology',
    facet_by: 'technology',
    max_facet_values: 1000,
    per_page: 0,
    filter_by: `is_default:=${onlyDefault}`,
  };

  const res = await typesenseClient
    .collections(collectionName)
    .documents()
    .search(searchParameters);
  return (
    res.facet_counts?.[0]?.counts.map((c) => ({
      technology: c.value,
      count: c.count,
    })) ?? []
  );
};

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

export const getCollectionDocuments = async (
  colletionName: CollectionName,
  is_default?: boolean
): Promise<SearchResponse<object>> => {
  const searchParameters = {
    q: '*',
    filter_by: is_default ? 'is_default:true' : 'is_default:false',
  };

  return await typesenseClient
    .collections(colletionName)
    .documents()
    .search(searchParameters);
};

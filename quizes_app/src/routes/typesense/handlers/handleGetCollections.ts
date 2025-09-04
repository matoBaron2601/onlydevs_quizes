import type { CollectionSchema } from 'typesense/lib/Typesense/Collection';

const handleGetCollections = async (): Promise<CollectionSchema[] | null> => {
  const response = await fetch('api/typesense/collections');
  if (!response.ok) {
    throw new Error('Failed to fetch collections');
  }
  return await response.json();
};
export default handleGetCollections;

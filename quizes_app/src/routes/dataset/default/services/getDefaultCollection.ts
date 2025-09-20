import type { CollectionSchema } from 'typesense/lib/Typesense/Collection';

const getDefaultCollection = async (): Promise<CollectionSchema[]> => {
  const response = await fetch('/api/typesense/default/collection', {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch default collection');
  }
  return response.json();
};

export default getDefaultCollection;

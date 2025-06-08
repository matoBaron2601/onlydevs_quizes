import type { CollectionSchema } from 'typesense/lib/Typesense/Collection';
import { fetchData } from '../../api/utils';

export const handlePopulateCollectionV1 = async () => {
  return await fetchData<CollectionSchema>(
    'api/typesense/v1/populateCollection',
    'POST'
  );
};

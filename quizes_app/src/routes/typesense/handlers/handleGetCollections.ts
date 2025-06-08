import type { CollectionSchema } from 'typesense/lib/Typesense/Collection';
import { fetchData } from '../../api/utils';

const handleFetchCollections = async (): Promise<CollectionSchema[] | null> => {
  return await fetchData<CollectionSchema[]>('api/typesense/collections');
};

export default handleFetchCollections;

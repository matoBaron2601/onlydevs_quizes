import type { CollectionSchema } from 'typesense/lib/Typesense/Collection';
import { fetchData } from '../../api/utils';
import type { SearchResponse } from 'typesense/lib/Typesense/Documents';

const handleGetCollectionDocuments = async (): Promise<
  SearchResponse<object>
> => {
  const result = await fetchData<SearchResponse<object>>(
    'api/typesense/v1/getCollectionDocuments'
  );
  if (result === null) {
    throw new Error('Failed to fetch collection documents');
  }
  return result;
};

export default handleGetCollectionDocuments;

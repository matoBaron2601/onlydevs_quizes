import { CollectionNames } from '../constants';

const handleCreateCollection = async (collectionName: CollectionNames) => {
  if (collectionName === CollectionNames.collectionV1) {
    const response = await fetch('api/typesense/v1/createCollection', {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error('Failed to create collection');
    }
    await fetch('api/typesense/v1/populateDefaultDocuments', {
      method: 'POST',
    });
    return response.json();
  }
};
export default handleCreateCollection;

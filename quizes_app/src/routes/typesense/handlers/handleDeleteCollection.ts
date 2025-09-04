export const handleDeleteCollectionV1 = async () => {
  return await fetch('api/typesense/v1/deleteCollection', {
    method: 'DELETE',
  });
};

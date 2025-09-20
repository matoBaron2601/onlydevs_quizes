const deleteDefaultCollection = async () => {
  const response = await fetch('/api/typesense/default/deleteCollection', {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete collection');
  }
  return response.json();
};

export default deleteDefaultCollection;

const createDefaultCollection = async () => {
  const response = await fetch('/api/typesense/default/createCollection', {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Failed to create collection');
  }
  return response.json();
};
export default createDefaultCollection;

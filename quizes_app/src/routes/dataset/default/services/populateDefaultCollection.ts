const populateDefaultCollection = async () => {
  const response = await fetch('/api/typesense/default/populateCollection', {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Failed to populate collection');
  }
  return response.json();
};

export default populateDefaultCollection;

const chunkFile = async (file: File): Promise<string[]> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('http://127.0.0.1:5000/rcc', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const results = await response.json();
  return JSON.parse(JSON.stringify(results, null, 2));
};
export default chunkFile;

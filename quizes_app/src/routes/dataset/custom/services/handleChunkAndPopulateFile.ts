import type { SearchResponse } from 'typesense/lib/Typesense/Documents';

const chunkAndPopulateFile = async (
  formData: FormData
): Promise<SearchResponse<object>> => {
  const result = await fetch('/api/chunker', {
    method: 'POST',
    body: formData,
  });
  if (!result.ok) {
    throw new Error('Failed to upload file');
  }
  return result.json();
};

export default chunkAndPopulateFile;

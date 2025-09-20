import type { UniqueTechnologies } from '../../common/types';

const getCustomUniqueTechnologies = async (): Promise<UniqueTechnologies> => {
  const result = await fetch('/api/typesense/custom/getUniqueTechnologies');
  if (!result.ok) {
    throw new Error('Failed to fetch collection documents');
  }

  return result.json();
};

export default getCustomUniqueTechnologies;

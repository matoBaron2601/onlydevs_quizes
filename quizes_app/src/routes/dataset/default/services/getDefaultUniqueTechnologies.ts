import type { UniqueTechnologies } from '../../common/types';

const getDefaultUniqueTechnologies = async (): Promise<UniqueTechnologies> => {
  const result = await fetch('/api/typesense/default/getUniqueTechnologies');
  if (!result.ok) {
    throw new Error('Failed to fetch collection documents');
  }

  return result.json();
};

export default getDefaultUniqueTechnologies;

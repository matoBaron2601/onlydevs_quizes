import type { SearchResponse } from "typesense/lib/Typesense/Documents";

const fetchAllCollectionDocuments = async (): Promise<SearchResponse<object>> => {
    const result = await fetch('api/typesense/v1/getCollectionDocuments');
    if (!result.ok) {
        throw new Error('Failed to fetch collection documents');
    }
    return result.json();
};

export default fetchAllCollectionDocuments;
type CollectionV1 = {
  content: string;
  technology: DefaultCollectionTechnology[];
  is_default: boolean;
  source_file: string;
};

export enum DefaultCollectionTechnology {
  JavaScript = 'JavaScript',
  TypeScript = 'TypeScript',
  Python = 'Python',
  Java = 'Java',
}

export enum DefaultCollectionNames {
  collectionV1 = 'collectionV1',
}



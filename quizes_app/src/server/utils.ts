import { promises as fs } from 'fs';
import path from 'path';

export const getAllFiles = async (directory: string): Promise<string[]> => {
  let files: string[] = [];

  try {
    const items = await fs.readdir(directory);

    for (const item of items) {
      const itemPath = path.join(directory, item);
      const stat = await fs.stat(itemPath);

      if (stat.isDirectory()) {
        const subFiles = await getAllFiles(itemPath);
        files = files.concat(subFiles);
      } else {
        files.push(itemPath);
      }
    }
  } catch (error) {
    console.error('Error reading directory:', error);
  }

  return files;
};

export const loadJsonFile = async (filePath: string): Promise<any> => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading JSON file at ${filePath}:`, error);
    return null;
  }
};

import rawData from './estructuras/pythonData.json';
import rawBucles from './bucles/buclesData.json';
import type { BuclesData, Category, PythonData, TopicCategory } from './types';

export const pythonData = rawData as PythonData;
export const buclesData = rawBucles as BuclesData;

export const categories: { key: string; data: Category }[] = Object.entries(pythonData).map(
  ([key, data]) => ({ key, data })
);

export const loopCategory: { key: string; data: TopicCategory } = {
  key: 'for',
  data: buclesData.bucles
};

export const categoryIcons: Record<string, string> = {
  listas: 'list',
  tuplas: 'layers',
  diccionarios: 'book',
  sets: 'target'
};

export const initialKey = 'listas';
export const totalMethods = categories.reduce((total, { data }) => total + data.methods.length, 0);
export const totalTopics = loopCategory.data.topics.length;

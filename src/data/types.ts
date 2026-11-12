export interface Param {
  name: string;
  type: string;
  req: boolean;
  desc: string;
}

export interface Method {
  id: string;
  name: string;
  tier: string;
  signature: string;
  returns: string;
  desc: string;
  params: Param[];
  code: string;
}

export interface Example {
  name: string;
  tier: string;
  syntax: string;
  returns: string;
  code: string;
}

export interface Topic {
  id: string;
  name: string;
  tier: string;
  syntax: string;
  returns: string;
  desc: string;
  params: Param[];
  examples: Example[];
}

export interface Category {
  title: string;
  breadcrumb: string;
  description: string;
  properties: string[];
  methods: Method[];
}

export interface TopicCategory {
  title: string;
  breadcrumb: string;
  description: string;
  properties: string[];
  topics: Topic[];
}

export type CategoryKey = 'listas' | 'tuplas' | 'diccionarios' | 'sets';

export type TopicKey = 'for';

export type PythonData = Record<CategoryKey, Category>;

export interface BuclesData {
  bucles: TopicCategory;
}

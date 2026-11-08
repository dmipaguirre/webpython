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

export interface Category {
  title: string;
  breadcrumb: string;
  description: string;
  properties: string[];
  methods: Method[];
}

export type CategoryKey = 'listas' | 'tuplas' | 'diccionarios' | 'sets';

export type PythonData = Record<CategoryKey, Category>;

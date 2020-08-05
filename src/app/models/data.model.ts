export interface IQuestion {
  id: string;
  question: string;
  answers: Array<String>;
  categories: Array<ICategory>;
}

export interface ICategory {
  id: string;
  category: string;
}

export const someCategories: Array<ICategory> = [
  {
    id: 'c_01',
    category: 'JavaScript',
  },
  {
    id: 'c_02',
    category: 'PHP',
  },
  {
    id: 'c_03',
    category: 'Angular',
  },
  {
    id: 'c_04',
    category: 'Lambdas',
  },
  {
    id: 'c_05',
    category: 'Streams',
  },
  {
    id: 'c_06',
    category: 'Functional Programming',
  },
  {
    id: 'c_07',
    category: 'Decorators',
  },
  {
    id: 'c_08',
    category: 'NodeJS',
  },
];

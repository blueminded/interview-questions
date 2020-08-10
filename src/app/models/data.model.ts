export interface IQuestion {
  id?: string;
  title: string;
  excerpt: string;
  createdAt?: string;
  categoryId: string;
  img_url: string;
}

export interface IAnswer {
  id?: string;
  questionId: string;
  createdAt?: string;
  content: string;
}

export interface ICategory {
  id?: string;
  name: string;
}

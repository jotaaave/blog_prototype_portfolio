export type Category = 'Internet' | 'Gamer' | 'Programming' | 'News';

export interface BlogPosts {
  author: string;
  title: string;
  content: string;
  category: Category;
}

export interface IdAndDate {
  id: number;
  date: string;
}

export interface Comments {
  author: string;
  content: string;
  idForPost: number;
}

export type BLogPostWithIdAndDate = BlogPosts & IdAndDate;

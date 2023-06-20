import { Comments } from './interfaces';

export interface CommentProtocol {
  addComment(content: string, id: number, author: string): void;

  getComments(id: number): Comments[];

  // viewComments(id: number): void;

  get comments(): Comments[];
}

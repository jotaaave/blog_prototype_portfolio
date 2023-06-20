import { CommentProtocol } from './commentsProtocol';
import { BLogPostWithIdAndDate, BlogPosts, Category } from './interfaces';

export interface BlogProtocol {
  post(post: BlogPosts): number;

  deletPost(id: number): void;

  editPost(id: number, newPost: BlogPosts): void;

  viewPost(id: number): BLogPostWithIdAndDate;

  viewCategory(category: Category): BLogPostWithIdAndDate[] | void;

  get posts(): BLogPostWithIdAndDate[];
}

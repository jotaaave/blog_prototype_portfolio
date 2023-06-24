import {
  BlogPosts,
  Category,
  BLogPostWithIdAndDate,
} from '../services/interfaces';

import { BlogProtocol } from '../services/blogProtocol';

import { GenerateId } from './generateId';

import { postError } from '../services/error-message';

export class Blog implements BlogProtocol {
  private blogPosts: BLogPostWithIdAndDate[] = [];
  constructor(public genId: GenerateId) {}

  post(post: BlogPosts): number {
    const newPost: BLogPostWithIdAndDate = Object.assign(
      { ...post },
      { id: Number(this.genId.generateId()) },
      { date: new Date().toLocaleDateString() },
    );
    this.blogPosts.push(newPost);
    return newPost.id;
  }

  deletPost(id: number): void {
    for (const i in this.blogPosts) {
      if (this.blogPosts[i].id === id) {
        this.blogPosts.splice(Number(i), 1);
        return;
      } else {
        continue;
      }
    }
    console.log('Não encontramos nenhum post com esse nome!');
    return;
  }

  editPost(id: number, newPost: BlogPosts): void {
    for (const i in this.blogPosts) {
      if (this.blogPosts[i].id === id) {
        const post: BLogPostWithIdAndDate = Object.assign(
          { ...newPost },
          { id: this.blogPosts[i].id },
          { date: new Date().toLocaleDateString() },
        );
        this.blogPosts[i] = post;
        return;
      } else {
        continue;
      }
    }

    console.log('Não foi possivel editar esse blog!');
    return;
  }

  viewPost(id: number): BLogPostWithIdAndDate {
    let post;
    for (const i in this.posts) {
      if (this.posts[i].id === id) {
        post = { ...this.blogPosts[i] };
      } else {
        continue;
      }
    }
    return post ? post : postError;
  }

  viewCategory(category: Category): BLogPostWithIdAndDate[] | void {
    const categoryFiltred = this.blogPosts.filter(
      (cate) => cate.category === category,
    );
    return categoryFiltred.length > 0
      ? categoryFiltred
      : console.log('Nada foi postado nessa categoria!');
  }

  get posts(): BLogPostWithIdAndDate[] {
    return this.blogPosts;
  }
}

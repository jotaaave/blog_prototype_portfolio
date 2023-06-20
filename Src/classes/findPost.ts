import { BlogProtocol } from '../services/blogProtocol';
import { BLogPostWithIdAndDate } from '../services/interfaces';

export class FindPost {
  findPost(id: number, blog: BlogProtocol): BLogPostWithIdAndDate | Error {
    for (const i in blog.posts) {
      if (blog.posts[i].id === id) {
        return blog.posts[i];
      } else {
        continue;
      }
    }

    throw new Error('Nada encontrado no sistema!');
  }
}

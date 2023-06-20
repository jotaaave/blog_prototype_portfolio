import { Comments } from '../services/interfaces';
import { FindPost } from './findPost';
import { FindPostProtocol } from '../services/findPostProtocol';
import { BlogProtocol } from '../services/blogProtocol';
import { CommentProtocol } from '../services/commentsProtocol';

export class Comment implements CommentProtocol {
  private _comments: Comments[] = [];
  private find: FindPostProtocol = new FindPost();

  constructor(public blog: BlogProtocol) {}

  addComment(content: string, id: number, author: string): void {
    if (this.find.findPost(id, this.blog)) {
      const postWithComment: Comments = {
        author: author,
        content: content,
        idForPost: id,
      };
      this._comments.push(postWithComment);
      return;
    } else {
      console.log('Não tem como comentar em algo inesxistente!');
      return;
    }
  }

  getComments(id: number): Comments[] {
    const comments = [];
    if (this.find.findPost(id, this.blog)) {
      for (const i in this._comments) {
        if (this._comments[i].idForPost === id) {
          comments.push(this._comments[i]);
        } else {
          continue;
        }
      }
    }
    if (comments.length > 0) {
      return comments;
    } else {
      comments.push({
        author: 'Sistema',
        content: 'Não há comentarios',
        idForPost: id,
      });
      return comments;
    }
  }

  get comments(): Comments[] {
    return this._comments;
  }
}

import { BlogProtocol } from './blogProtocol';
import { CommentProtocol } from './commentsProtocol';
import { BLogPostWithIdAndDate } from './interfaces';

export abstract class BlogView {
  viewComments(
    id: number,
    blog: BlogProtocol,
    comments?: CommentProtocol,
  ): BLogPostWithIdAndDate | void {
    return;
  }
}

export class BlogViewWithComments extends BlogView {
  viewComments(
    id: number,
    blog: BlogProtocol,
    comments: CommentProtocol,
  ): void {
    let post;
    for (const i in blog.posts) {
      if (blog.posts[i].id === id) {
        post = blog.posts[i];
        break;
      } else {
        post = undefined;
      }
    }
    if (!post) {
      console.log('Nenhum post foi achado!');
      return;
    } else {
      console.log(`
      ${post.title}\n
      ${post.author} - ${post.category}\n
      ${post.content}\n
      `);
      const commentList = comments.comments;
      for (const i in commentList) {
        if (commentList[i].idForPost === post.id) {
          const comment = commentList[i];
          console.log(`${comment.author}: ${comment.content}\n`);
        }
      }
      return;
    }
  }
}

export class BlogViewNoComments extends BlogView {
  viewComments(id: number, blog: BlogProtocol): void {
    let post;
    for (const i in blog.posts) {
      if (blog.posts[i].id === id) {
        post = blog.posts[i];
        break;
      } else {
        post = undefined;
      }
    }
  }
}

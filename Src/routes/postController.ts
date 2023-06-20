import { Request, Response } from 'express';
import { BlogProtocol } from '../services/blogProtocol';

export class PostController {
  blogPost(req: Request, res: Response) {
    res.render('post');
  }

  blogPostSend(blog: BlogProtocol) {
    return (req: Request, res: Response) => {
      const postId = blog.post(req.body);
      const post = blog.viewPost(postId);
      res.redirect(`/post/view/${post.id}`);
    };
  }

  blogPostView(blog: BlogProtocol) {
    return (req: Request, res: Response) => {
      const post = blog.viewPost(Number(req.params.id));
      res.render('viewPost', {
        post: post,
      });
    };
  }
}

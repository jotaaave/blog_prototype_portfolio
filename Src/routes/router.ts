import { Router } from 'express';
import { PostController } from './postController';
import { HomeController } from './homeController';
import { RegisterController } from './registerController';
import { BlogProtocol } from '../services/blogProtocol';
import { middle } from '../middlewares/middlewares';

class Route {
  private _router: Router = Router();
  private postController: PostController = new PostController();
  private homeController: HomeController = new HomeController();
  private signController: RegisterController = new RegisterController();
  constructor(public blog: BlogProtocol) {
    // Posts
    this._router.get(
      '/post',
      middle.loginMiddleware,
      this.postController.blogPost,
    );
    this._router.get(
      '/post/view/:id',
      middle.loginMiddleware,
      this.postController.blogPostView(blog),
    );
    this._router.post('/post', this.postController.blogPostSend(blog));

    // Home
    this._router.get('/', middle.loginMiddleware, this.homeController.home);

    // Register
    this._router.get(
      '/register',
      middle.registerRecuse,
      this.signController.register,
    );
    this._router.post('/register', this.signController.registerPost);
  }

  get router(): Router {
    return this._router;
  }
}

export { Route };
import { Router } from 'express';
import { PostController } from './postController';
import { HomeController } from './homeController';
import { RegisterController } from './registerController';
import { LoginController } from './loginController';
import { BlogProtocol } from '../services/blogProtocol';
import { middle } from '../Middlewares/middlewares';

class Route {
  private _router: Router = Router();
  private postController: PostController = new PostController();
  private homeController: HomeController = new HomeController();
  private signController: RegisterController = new RegisterController();
  private loginController: LoginController = new LoginController();
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

    // Login
    this._router.get(
      '/login',
      middle.registerRecuse,
      this.loginController.loginGet,
    );
    this._router.post('/login', this.loginController.loginPost);
  }

  get router(): Router {
    return this._router;
  }
}

export { Route };

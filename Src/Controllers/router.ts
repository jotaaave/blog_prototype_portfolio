import { Router } from 'express';
import { PostController } from './postController';
import { HomeController } from './homeController';
import { RegisterController } from './registerController';
import { LoginController } from './loginController';
import { BlogProtocol } from '../services/blogProtocol';
import { middle } from '../Middlewares/middlewares';
import { ProfileController } from './profileController';

const [
  postController,
  homeController,
  signController,
  loginController,
  profileController,
] = [
  new PostController(),
  new HomeController(),
  new RegisterController(),
  new LoginController(),
  new ProfileController(),
];

class Route {
  private _router: Router = Router();
  constructor(public blog: BlogProtocol) {
    // Posts
    this._router.get('/post', middle.loginMiddleware, postController.blogPost);
    this._router.get(
      '/post/view/:id',
      middle.loginMiddleware,
      postController.blogPostView(blog),
    );
    this._router.post('/post', postController.blogPostSend(blog));

    // Home
    this._router.get('/', middle.loginMiddleware, homeController.home);

    // Register
    this._router.get(
      '/register',
      middle.registerRecuse,
      signController.register,
    );
    this._router.post('/register', signController.registerPost);

    // Login
    this._router.get('/login', middle.registerRecuse, loginController.loginGet);
    this._router.post('/login', loginController.loginPost);
    this._router.get('/logout', middle.loginMiddleware, loginController.logout);

    // Profile
    this._router.get(
      '/profile',
      middle.loginMiddleware,
      profileController.profileGet,
    );
  }

  get router(): Router {
    return this._router;
  }
}

export { Route };

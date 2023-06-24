import { Request, Response } from 'express';
import { mongoAccount } from '../Model/mongoAccount';

export class ProfileController {
  async profileGet(req: Request, res: Response) {
    const user = await mongoAccount.findAccountByUser(
      req.session.userLogged.username,
    );
    console.log(user);
    return user
      ? res.render('profile', {
          user: user.user,
          email: user.email,
          posts: user.posts,
        })
      : res.redirect('/');
  }
}

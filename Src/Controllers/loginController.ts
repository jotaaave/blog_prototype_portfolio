import { Request, Response } from 'express';
import { mongoAccount } from '../Model/mongoAccount';

export class LoginController {
  loginGet(req: Request, res: Response) {
    res.render('login');
  }

  async loginPost(req: Request, res: Response) {
    const user = await mongoAccount.loginAccount(req.body);
    if (user) {
      if (user.password === req.body.password) {
        req.session.loginAuthentic = true;
        req.session.userLogged = { username: user.user };
        return res.redirect('/');
      } else {
        req.flash('errMsg', 'Senha incorreta');
        return res.render('login');
      }
    }
    req.flash('errMsg', 'Email não existe!');
    return res.render('login');
  }
}

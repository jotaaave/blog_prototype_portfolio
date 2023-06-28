import { Request, Response } from 'express';
import { mongoAccount } from '../Model/mongoAccount';
import passhash = require('password-hash');

export class LoginController {
  loginGet(req: Request, res: Response) {
    res.render('login');
  }

  logout(req: Request, res: Response) {
    req.session.loginAuthentic = false;
    req.session.userLogged.username = null;
    return res.redirect('/login');
  }

  async loginPost(req: Request, res: Response) {
    const user = await mongoAccount.loginAccount(req.body);
    if (user) {
      if (passhash.verify(req.body.password, user.password)) {
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

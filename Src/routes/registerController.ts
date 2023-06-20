import { Request, Response } from 'express';
import { mongoAccount } from '../Model/mongoAccount';
import { CheckUp } from '../classes/checkup';

export class RegisterController {
  register(req: Request, res: Response) {
    res.render('register');
  }

  registerPost(req: Request, res: Response) {
    const check = new CheckUp();
    const checked = check.clean(req.body);
    if (checked.length > 0) {
      req.flash('errMsgArray', checked);
      req.flash('user', req.body.user);
      req.flash('email', req.body.email);
      req.flash('password', req.body.password);
      return res.redirect('/register');
    }
    mongoAccount.createAccount(req.body);
    req.session.loginAuthentic = true;
    req.session.userLogged = { username: req.body.user };
    res.redirect('/');
    return;
  }
}

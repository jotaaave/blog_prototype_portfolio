import { Request, Response } from 'express';
import { mongoAccount } from '../Model/mongoAccount';

export class HomeController {
  async home(req: Request, res: Response) {
    const user = await mongoAccount.findAccountByUser(
      req.session.userLogged.username,
    );
    console.log(user);
    res.render('home');
  }
}

import { Request, Response } from 'express';

export class ProfileController {
  profileGet(req: Request, res: Response) {
    return res.render('profile');
  }
}

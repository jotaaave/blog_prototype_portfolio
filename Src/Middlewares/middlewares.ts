import { Request, Response, NextFunction } from 'express';

class Middlewares {
  loginMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log(req.ip);
    if (req.session.loginAuthentic) {
      return next();
    }

    return res.redirect('/register');
  }

  registerRecuse(req: Request, res: Response, next: NextFunction) {
    if (req.session.loginAuthentic) return res.redirect('/');
    return next();
  }
}

export const middle = new Middlewares();

/*
Usuario faz loguin 1 vez, LOGIN: TRUE
Usuario perde o LOGIN: TRUE, porem a conta existe no banco de dados
Usuario faz login nessa conta novamente (Caso exista) e volta o LOGIN: TRUE
*/

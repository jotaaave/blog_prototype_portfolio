import { Express } from 'express';
import { Router } from 'express';
import { SessionCreate } from '../classes/session';
import flash = require('express-flash');
import express = require('express');

declare module 'express-session' {
  export interface SessionData {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }
}

class App {
  public server: Express = express();
  private session: express.RequestHandler = new SessionCreate().init();

  middleware(): void {
    app.server.use(express.static('./Src/public'));
    app.server.set('view engine', 'ejs');
    app.server.set('views', './Src/View');
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(this.session);
    this.server.use(flash());
  }

  router(route: Router): void {
    this.server.use(route);
  }
}

export const app = new App();

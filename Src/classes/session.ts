import session = require('express-session');
import MongoStore = require('connect-mongo');
import endpoint from '../../endpoints.config';

class SessionCreate {
  init() {
    const sessionInit = session({
      secret: 'COOKIESOFMYBLOGWEB',
      saveUninitialized: true,
      resave: false,
      store: MongoStore.create({
        mongoUrl: endpoint.MongoURI,
        dbName: 'blogSessions',
      }),
      cookie: {
        maxAge: 365 * 24 * 60 * 60 * 1000,
      },
    });
    return sessionInit;
  }
}

export { SessionCreate };

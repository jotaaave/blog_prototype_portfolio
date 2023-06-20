import mongoose = require('mongoose');
import { Schema } from 'mongoose';
import { UserMongoLogin } from '../services/userProtocol';

class MongoAccount {
  private accountSchema: Schema = new Schema({
    email: String,
    password: String,
    user: String,
  });

  private accountModel = mongoose.model('BlogLogin', this.accountSchema);

  createAccount(body: UserMongoLogin): void {
    const userLogin = new this.accountModel({
      user: body.user,
      password: body.password,
      email: body.email,
    });
    userLogin.save();
    console.log('Cheguei aqui', userLogin);
    return;
  }

  async findAccountByUser(username: string) {
    this.accountModel
      .findOne({ user: username })
      .then((data) => {
        if (data) {
          const objectUser = {
            user: data.user,
            email: data.email,
          };
          return objectUser;
        } else {
          return null;
        }
      })
      .catch((e) => console.error(e));
  }
}

export const mongoAccount = new MongoAccount();

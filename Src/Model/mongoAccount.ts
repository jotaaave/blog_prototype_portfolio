import mongoose = require('mongoose');
import { Schema } from 'mongoose';
import { UserMongoLogin, UserLoginBody } from '../services/userProtocol';

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
    return;
  }

  async loginAccount(body: UserLoginBody) {
    const user = await this.accountModel.findOne({ email: body.email });
    return user ? user : null;
  }

  async findAccountByUser(username: string) {
    const user = await this.accountModel.findOne({ user: username });
    if (user) {
      const newUser = {
        user: user.user,
        email: user.email,
      };
      return newUser;
    } else {
      return null;
    }
  }
}

export const mongoAccount = new MongoAccount();

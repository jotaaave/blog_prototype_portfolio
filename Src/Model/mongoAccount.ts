import mongoose = require('mongoose');
import { Schema } from 'mongoose';
import { UserMongoLogin, UserLoginBody } from '../services/userProtocol';

class MongoAccount {
  private accountSchema: Schema = new Schema({
    email: String,
    password: String,
    user: String,
    posts: Array,
  });

  private accountModel = mongoose.model('BlogLogin', this.accountSchema);

  async createAccount(body: UserMongoLogin): Promise<boolean> {
    const user = await this.accountModel.findOne({ email: body.email });
    if (user) return false;
    const userLogin = new this.accountModel({
      user: body.user,
      password: body.password,
      email: body.email,
      posts: [],
    });
    userLogin.save();
    return true;
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
        posts: user.posts,
      };
      return newUser;
    } else {
      return null;
    }
  }
}

export const mongoAccount = new MongoAccount();

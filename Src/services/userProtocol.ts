interface UserMongoLogin {
  user: string;
  email: string;
  password: string;
}

interface UserLoginBody {
  email: string;
  password: string;
}

export { UserMongoLogin, UserLoginBody };

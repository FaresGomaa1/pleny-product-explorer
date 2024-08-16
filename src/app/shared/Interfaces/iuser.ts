export interface IUserCredentials {
  username: string;
  password: string;
  expiresInMins: number;
}
export interface ITokens {
  token: string;
  refreshToken: string;
}
export interface IUser extends ITokens {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}



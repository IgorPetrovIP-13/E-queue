export interface ISignUpReq {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface ISignUpRes {
  user: {
    _id: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    role: string;
  };
  accessToken: string;
}

export interface ISignInReq extends Pick<ISignUpReq, "email" | "password"> {}

export interface ISignInRes extends ISignUpRes {}

export interface IRefreshRes {
  accessToken: string;
}

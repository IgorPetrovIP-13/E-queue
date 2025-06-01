export interface IGetProfileRes {
  _id: string;
  avatar: string | null;
  name: string;
  surname: string;
  email: string;
  role: string;
}

export interface IUpdateProfileReq {
  avatar: string | null;
  name: string;
  surname: string;
  email: string;
  password?: string;
}

export interface IUpdateProfileRes extends IGetProfileRes {}

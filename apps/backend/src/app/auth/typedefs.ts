import { User } from "../user/user.schema";

export type UserWithTokens = {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
};

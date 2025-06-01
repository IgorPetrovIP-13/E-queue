export enum Tokens {
  ACCESS_TOKEN = "access_token",
  REFRESH_TOKEN = "refresh_token"
}

export enum TokensExpiration {
  ACCESS_TOKEN = 15 * 60 * 1000,
  REFRESH_TOKEN = 60 * 60 * 24 * 7 * 1000
}

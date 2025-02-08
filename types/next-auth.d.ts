import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  // Session tipi üzerine eklemeler yapıyoruz
  interface Session {
    user: {
      id: string;
      accessToken: string;
      refreshToken: string;
    } & DefaultSession["user"];  
  }

  interface User extends DefaultUser {
    accessToken: string;
    refreshToken: string;
  }
}

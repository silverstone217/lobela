import NextAuth, { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";
import { AuthSchema } from "./schema/auth";
import {
  AUTH_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from "./lib/envVariables";
import { JWT } from "next-auth/jwt";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth/signin",
  },

  secret: AUTH_SECRET,
  trustHost: true,
  session: { strategy: "jwt" },

  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID!,
      clientSecret: GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Mot de passe", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          // throw new Error("Les champs sont vides !");
          return null;
        }

        const validated = AuthSchema.safeParse(credentials);
        if (!validated.success) {
          // const errors = validated.error.issues;
          // const messages = errors.map((issue) => issue.message).join(", ");
          // throw new Error(messages || "Erreur de validation");
          return null;
        }

        const data = validated.data;

        const user = await prisma.user.findUnique({
          where: { email: data.email },
        });

        if (!user || !user.password) {
          return null; // NextAuth
        }

        const isValid = await bcrypt.compare(data.password, user.password);
        if (!isValid) return null;
        return user;
      },
    }),
  ],

  callbacks: {
    async session({ token, session }: { token: JWT; session: Session }) {
      if (token && session.user) {
        const tokenId = token.sub;
        if (tokenId) {
          const user = await prisma.user.findUnique({
            where: {
              id: tokenId,
            },
          });
          if (user) {
            session.user = {
              ...user,
            };
          }
        }
      }
      return session;
    },
  },
});

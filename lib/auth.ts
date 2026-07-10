import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { prisma } from "@/db/prisma";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { SendEmail } from "./resend";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { passwordSchema } from "./validator";
import { covertToPlainObject } from "./utils";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,

    // TODO: Implement password reset
    async sendResetPassword({ user, url }) {
      await SendEmail({
        to: user.email,
        subject: "Reset your password for MD LAWANCY LIMITED",
        text: `You can reset your password by clicking the following link: ${url}`,
      });
    },
  },

  // TODO: Implement email verification
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    async sendVerificationEmail({ user, url }) {
      await SendEmail({
        to: user.email,
        subject: "Verify your email for MD LAWANCY LIMITED",
        text: `Please verify your email by clicking the following link: ${url}`,
      });
    },
  },

  user: {
    additionalFields: covertToPlainObject({
      role: {
        type: "string",
        input: false,
      },
      phoneNumber: {
        type: "string",
        input: false,
      },
      bio: {
        type: "string",
        input: false,
      },
      businessName: {
        type: "string",
        input: false,
      },
      userName: {
        type: "string",
        input: false,
      },
      gender: {
        type: "string",
        input: false,
      },
      otherNumber: {
        type: "string",
        input: false,
      },
      dateOfBirth: {
        type: "string",
        input: false,
      },
      businessAddress: {
        type: "string",
        input: false,
      },
    }),
  },

  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (
        ctx.path === "/sign-up/email" ||
        ctx.path === "reset-password" ||
        ctx.path === "change-password"
      ) {
        const password = ctx.body.password || ctx.body.newPassword;
        const { error } = passwordSchema.safeParse(password);
        if (error) {
          throw new APIError("BAD_REQUEST", {
            message:
              "Password must be at least 8 characters long and contain at least one special character",
          });
        }
      }
    }),
  },
  // session: {
  //   cookieCache: {
  //     enabled: true,
  //     maxAge: 60 * 60 * 24 * 7, // 7 days
  //   },
  // },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [inferAdditionalFields(), nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;

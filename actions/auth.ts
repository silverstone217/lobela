"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { AuthSignupSchema } from "@/schema/auth";
import { hash } from "bcryptjs";
import z from "zod";

// GET USER
export const getUser = async () => {
  const session = await auth();
  const user = session?.user || null;
  return user;
};

// SIGNUP
export type SignupDataType = z.infer<typeof AuthSignupSchema>;

export const createNewUser = async (data: SignupDataType) => {
  try {
    const validatedData = AuthSignupSchema.safeParse(data);

    // CHECK VALIDATION
    if (!validatedData.success) {
      const errors = validatedData.error.issues;
      const messages = validatedData.error.issues
        .map((issue) => issue.message)
        .join(", ");

      return {
        errors,
        error: true,
        message: messages,
        data: null,
      };
    }
    const safeData = validatedData.data;

    // IS USER EXIST ALREADY
    const isUserExisted = await prisma.user.findUnique({
      where: {
        email: safeData.email,
      },
    });

    if (isUserExisted) {
      return {
        error: true,
        message: "Un utilisateur avec cet email exist deja!",
        data: null,
      };
    }

    // HASH PASSWORD
    const hashedPassword = await hash(safeData.password, 10);

    // CREATE NEW USER
    const newUser = await prisma.user.create({
      data: {
        password: hashedPassword,
        name: safeData.name,
        email: safeData.email,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = newUser;

    return {
      data: rest,
      message: `Bienvenue dans Lobela, ${rest.name ?? rest.email}`,
      error: false,
    };
  } catch (error) {
    console.log("Signup error:", error);
    return {
      error: true,
      message: "Une erreur est survenue, veuillez réessayer plus tard!",
      data: null,
    };
  }
};

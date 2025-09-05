import z from "zod";

export const AuthSchema = z.object({
  email: z
    .email()
    .min(5, "L'Email doit contenir au moins 5 caractères")
    .max(60, "L'Email doit contenir au plus 60 caractères"),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .max(12, "Le mot de passe doit contenir au plus 12 caractères"),
});

export const AuthSignupSchema = z.object({
  email: z
    .email()
    .min(5, "L'Email doit contenir au moins 5 caractères")
    .max(60, "L'Email doit contenir au plus 60 caractères"),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .max(12, "Le mot de passe doit contenir au plus 12 caractères"),
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(60, "Le nom doit contenir au plus 60 caractères"),
});

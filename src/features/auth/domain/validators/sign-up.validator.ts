

import { useTranslation } from "@/i18n/client";
import * as z from "zod";



export const signUpSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  email: z.string().email("Correo electrónico inválido"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[0-9]/, "Debe contener al menos 1 número")
    .regex(/[a-z]/, "Debe contener al menos 1 letra minúscula")
    .regex(/[A-Z]/, "Debe contener al menos 1 letra mayúscula"),
  confirmPassword: z.string().min(1, "Este campo es requerido")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export function createSignUpSchema(t: (key: string) => string) {
  return z.object({
    name: z.string().min(3, t("inputs.name.validation.min")),
    email: z.string().email(t("inputs.email.validation.invalid")),
    password: z
      .string()
      .min(8, t("inputs.password.validation.min"))
      .regex(/[0-9]/, t("inputs.password.validation.number"))
      .regex(/[a-z]/, t("inputs.password.validation.lowercase"))
      .regex(/[A-Z]/, t("inputs.password.validation.uppercase")),
    confirmPassword: z.string().min(1, t("inputs.confirmPassword.validation.required"))
  }).refine((data) => data.password === data.confirmPassword, {
    message: t("inputs.confirmPassword.validation.match"),
    path: ["confirmPassword"],
  });
}

export function checkStrength(pass: string, t: (key: string) => string) {
  const requirements = [
    { regex: /.{8,}/, text: t("inputs.password.validation.length") },
    { regex: /[0-9]/, text: t("inputs.password.validation.number") },
    { regex: /[a-z]/, text: t("inputs.password.validation.lowercase") },
    { regex: /[A-Z]/, text: t("inputs.password.validation.uppercase") },
  ];
  return requirements.map((req) => ({
    met: req.regex.test(pass),
    text: req.text,
  }));
}

export type SignUpFormValues = z.infer<typeof signUpSchema>;
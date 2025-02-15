"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Loader, Lock, Mail, MailCheckIcon, User } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { PasswordInput } from "@/components/ui/password-input"


import { Check, X } from "lucide-react"
import { useMemo, useState } from "react"


import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { useSignUpMutation } from "@/features/auth/infrastructure/services/auth.service"
import GitHubIcon from "../icons/github-icon"

type ApiError = {
  message: string | string[]
  error: string
  statusCode: number
}

import {  checkStrength, createSignUpSchema, type SignUpFormValues } from '@/features/auth/domain/validators/sign-up.validator';
import { HtppStatus } from "@/features/auth/domain/models/HttpStatus"
import AuthLayout from "../layout/AuthLayout"
import { ErrorHandler } from "@/features/auth/domain/models/ErrorHandler"
import { useTranslation } from "@/i18n/client"


export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {

  const { t } = useTranslation("sign-up")
  const signUpSchema = createSignUpSchema(t);
  
  const [signUp, { isLoading, isSuccess }] = useSignUpMutation();

  const [isSubtmitted, setIsSubmitted] = useState(false);
  const router = useRouter();
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "Cesar Efrain",
      email: "cesarcunyarache@gmail.com",
      password: "Cunya cat2208",
      confirmPassword: "Cunya cat2208",
    },
  })

  // Add these calculations
  const strength = useMemo(() =>
    checkStrength(form.watch("password") || "", t),
    [form.watch("password")]
  )

  const strengthScore = useMemo(() =>
    strength.filter((req) => req.met).length,
    [strength]
  )


  const onSubmit = async (data: SignUpFormValues) => {
    try {
      const result = await signUp(data).unwrap();
      if (result.status === HtppStatus.CREATED) {
        setIsSubmitted(true);
        toast.success('Cuenta creada exitosamente');
      }
    } catch (err) {
      toast.error(new ErrorHandler().handleError(err));
    }
  };
  // Add this helper function
  function isFetchBaseQueryError(
    error: unknown
  ): error is FetchBaseQueryError {
    return typeof error === 'object' && error != null && 'status' in error;
  }

  return (
    <>

      {!isSubtmitted ?
        (<AuthLayout>
          <Form {...form} >
            <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={form.handleSubmit(onSubmit)} >
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">{t("sign-up:title")}</h1>
                <p className="text-balance text-xs text-muted-foreground">
                  {t("sign-up:description")}
                </p>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("sign-up:inputs.name.label")}
                          <span className="ml-[2px] text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <div className="relative">
                              <Input
                                className={cn(
                                  "peer ps-9",
                                  form.formState.errors.name && "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/20"
                                )}
                                placeholder="John Doe"
                                disabled={isLoading}
                                {...field}
                              />
                              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                                <User size={16} strokeWidth={2} aria-hidden="true" />
                              </div>
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("sign-up:inputs.email.label")}</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <div className="relative">
                              <Input className="peer ps-9" disabled={isLoading} placeholder="correo@ejemplo.com" {...field} type="email" />
                              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                                <Mail size={16} strokeWidth={2} aria-hidden="true" />
                              </div>
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("sign-up:inputs.password.label")}</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <div className="relative">
                              <PasswordInput
                                placeholder="contraseña"
                                disabled={isLoading}
                                className={`peer ps-9 ${field.value && "mb-4"}`}
                                {...field}
                              />
                              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                                <Lock size={16} strokeWidth={2} aria-hidden="true" />
                              </div>
                            </div>

                            {field.value && (
                              <>
                                <div
                                  className="mt-3 h-1 w-full overflow-hidden rounded-full bg-border"
                                  role="progressbar"
                                  aria-valuemin={0}
                                  aria-valuemax={4}
                                >

                                  <div
                                    className={` h-full transition-all duration-500 ease-out ${!field.value
                                      ? "bg-border"
                                      : strengthScore <= 1
                                        ? "bg-red-500"
                                        : strengthScore <= 2
                                          ? "bg-orange-500"
                                          : strengthScore === 3
                                            ? "bg-amber-500"
                                            : "bg-emerald-500"
                                      }`}
                                    style={{
                                      width: `${(strengthScore / 4) * 100}%`,
                                    }}
                                  />
                                </div>

                                <ul className="space-y-1.5">
                                  {strength.map((req, index) => (
                                    <li
                                      key={index}
                                      className="flex items-center gap-2"
                                    >
                                      {req.met ? (
                                        <Check
                                          size={16}
                                          className="text-emerald-500"
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <X
                                          size={16}
                                          className="text-muted-foreground/80"
                                          aria-hidden="true"
                                        />
                                      )}
                                      <span
                                        className={`text-xs ${req.met
                                          ? "text-emerald-600"
                                          : "text-muted-foreground"
                                          }`}
                                      >
                                        {req.text}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("sign-up:inputs.confirmPassword.label")}</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <div className="relative">
                              <PasswordInput
                                disabled={isLoading}
                                placeholder="confirmar contraseña"
                                className="peer ps-9"
                                {...field}
                              />
                              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                                <Lock size={16} strokeWidth={2} aria-hidden="true" />
                              </div>
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full group" disabled={isLoading}>

                  {
                    isLoading ?
                      <Loader className="-ms-1 me-2 animate-spin"
                        size={16}
                        strokeWidth={2}
                        aria-hidden="true" />

                      :

                      <>
                        Registrarse
                        <ArrowRight className="transition-transform group-hover:translate-x-1" /></>
                  }

                </Button>

                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">
                    O continuar con
                  </span>
                </div>

                <Button type="button" variant="outline" className="w-full">
                  <GitHubIcon />
                  Registrarse con GitHub
                </Button>
              </div>

              <div className="text-center text-sm">
                ¿Ya tienes una cuenta?{" "}
                <Link href="/sign-in" className="underline underline-offset-4">
                  Iniciar sesión
                </Link>
              </div>
            </form>
          </Form>
        </AuthLayout>
        )
        :
        (
          <div className="w-full h-screen flex flex-col gap-2 items-center justify-center rounded-md">
            <div className="size-[48px]">
              <MailCheckIcon size="48px" className="animate-bounce" />
            </div>
            <h2 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold">
              Check your email
            </h2>
            <p className="mb-2 text-center text-sm text-muted-foreground dark:text-[#f1f7feb5] font-normal">
              We just sent a verification link to {form.getValues().email}.
            </p>
            <Link href="/sign-in">
              <Button className="h-[40px]">
                Go to login
                <ArrowRight />
              </Button>
            </Link>
          </div>

        )

      }
    </>
  )
}










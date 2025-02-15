"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { ArrowRight, AtSign, Lock, Mail } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { PasswordInput } from "@/components/ui/password-input"
import GitHubIcon from "../icons/github-icon"
import GoogleIcon from "../icons/google-icon"
import FacebookIcon from "../icons/facebook-icon"
import AuthLayout from "../layout/AuthLayout"


const formSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
})

type FormValues = z.infer<typeof formSchema>


export function SignInForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "cesarcunyarache@gmail.com",
      password: "123456",
    },
  })

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          correo: data.email,
          contrasena: data.password,
        }),
      })

      console.log(res)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AuthLayout>
      <Form {...form}>
        <form className={cn("flex flex-col gap-6 ", className)} {...props} onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center gap-2 text-center ">
            <h1 className="text-2xl font-bold">Inicia sesión en tu cuenta</h1>
            <p className="text-balance text-xs text-muted-foreground">
              Ingresa tu correo electrónico para acceder a tu cuenta
            </p>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <div className="relative">
                          <Input className="peer ps-9" placeholder="correo electrónico" {...field} type="email" />
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
                    <div className="flex items-center">
                      <FormLabel>Contraseña</FormLabel>
                      <a
                        href={`/forgot-password?email=${form.getValues().email}`}
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                      >
                        ¿Olvidaste tu contraseña?
                      </a>
                    </div>
                    <FormControl>



                      <div className="space-y-2">
                        <div className="relative">
                          <PasswordInput

                            placeholder="contraseña"
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
            <Button type="submit" className="w-full group" >
              Iniciar sesión
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Button>
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">
                O continuar con
              </span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <Button variant="outline" className="w-full">
                <GoogleIcon />
                Iniciar sesión con GitHub
              </Button>

              <Button variant="outline" className="w-full">
                <FacebookIcon />
                Iniciar sesión con GitHub
              </Button>

              <Button variant="outline" className="w-full">
                <GitHubIcon />
                Iniciar sesión con GitHub
              </Button>
            </div>
          </div>
          <div className="text-center text-sm">
            ¿No tienes una cuenta?{" "}
            <Link href="/sign-up" className="underline underline-offset-4">
              Regístrate
            </Link>
          </div>
        </form>

      </Form>
    </AuthLayout>
  )
}


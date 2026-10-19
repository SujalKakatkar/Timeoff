import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import type React from "react"
import { registerPayload, signupSchema, type SignupSchemaType } from "@/schemas/signup-schema"
import { zodResolver } from '@hookform/resolvers/zod'
import { Spinner } from "../ui/spinner"
import { toast } from "../ui/toast"
import { useAuthStore } from "@/store/UseAuthStore"
import { useNavigate } from "react-router"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">): React.JSX.Element {
  const signUp = useAuthStore(s => s.register)
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isValid, isSubmitting }, } = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",

  });

  const handleSignup = async (formData: SignupSchemaType) => {
    const payload = registerPayload.parse(formData);
    try {
      const { error } = await signUp(payload);
      if (error) {
        toast.add({
          type: "error",
          description: "something went wrong"
        });
        return
      }
      toast.add({
        type: "success",
        description: "Account created. Please sign in."
      })
      navigate("/auth/signin")

    } catch{
      toast.add({
        type: "error",
        description: "something went wrong"
      })
    }

  }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleSignup)}>

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  {...register("name")}
                  id="name" type="text" placeholder="Alex Xu" required maxLength={20} />
                {errors.name && <FieldDescription className="text-destructive">
                  {errors.name.message}
                </FieldDescription>}
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  {...register("email")}
                  type="email"
                  placeholder="m@example.com"
                  required
                />
                {errors.email && <FieldDescription className="text-destructive">
                  {errors.email.message}
                </FieldDescription>}
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      minLength={8}
                      maxLength={50}
                      {...register("password")}
                      id="password" type="password" required />
                  </Field>
                  <Field>
                    <FieldLabel
                      htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input minLength={8} maxLength={50} {...register("confirmPassword")} id="confirm-password" type="password" required />
                  </Field>
                </Field>
                {errors.password && <FieldDescription className="text-destructive">
                  {errors.password.message}
                </FieldDescription>}
                {errors.confirmPassword && <FieldDescription className="text-destructive">
                  {errors.confirmPassword.message}
                </FieldDescription>}
              </Field>
              <Field>
                <Button disabled={!isValid || isSubmitting} type="submit">
                  {isSubmitting ? < >
                    <Spinner />
                    Creating account
                  </> : "Create Account"}
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <a href="/auth/signin">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}

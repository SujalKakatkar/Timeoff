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
    FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { LoginSchema, type LoginSchemaType } from "@/schemas/login-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Spinner } from "../ui/spinner"
import { toast } from "../ui/toast"

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const { register, handleSubmit, clearErrors, formState: { errors, isValid, isSubmitting } } = useForm({
        resolver: zodResolver(LoginSchema),
        mode: "onChange"
    });
    //todo: instead of specific with error messages in the login form it should be one generic message Invalid email or password
    const handleLogin = async (data: LoginSchemaType) => {
        clearErrors("root")
        console.log(data);
        try {
            //todo: api call for login 
        } catch (error) {
            toast.add({
                type:"error",
                description:"something went wrong"
            })
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome back</CardTitle>
                    <CardDescription>
                        Login with your Apple or Google account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <FieldGroup>
                            <Field>
                                <Button variant="outline" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path
                                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    Login with Google
                                </Button>
                            </Field>
                            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                                Or continue with
                            </FieldSeparator>

                            <Field>
                                <FieldLabel htmlFor="username">Username</FieldLabel>
                                <Input
                                    {...register("username")}
                                    id="username"
                                    type="text"
                                    placeholder="jhon007"
                                    required
                                />
                                {errors.username && <FieldDescription className="text-destructive">
                                    {errors.username.message}
                                </FieldDescription>}
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <a
                                        href="#"
                                        className="ml-auto text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input {...register("password")} id="password" type="password" required />
                                {errors.password && <FieldDescription className="text-destructive">
                                    {errors.password.message}
                                </FieldDescription>}
                            </Field>
                            <Field>
                                <Button disabled={!isValid || isSubmitting} type="submit">
                                    {isSubmitting ? < >
                                        <Spinner />
                                        Loging in
                                    </> : "Log In"}
                                </Button>
                                <FieldDescription className="text-center">
                                    Don&apos;t have an account? <a href="/auth/signup">Sign up</a>
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

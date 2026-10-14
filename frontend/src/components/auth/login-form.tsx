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
import { useForm } from "react-hook-form"
import { LoginSchema, type LoginSchemaType } from "@/schemas/login-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Spinner } from "../ui/spinner"
import { toast } from "../ui/toast"
import { useAuthStore } from "@/store/UseAuthStore"
import { useNavigate } from "react-router"
import { HOME } from "@/constants/routes"

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const login = useAuthStore(s => s.login)
    const navigate = useNavigate();
    const { register, handleSubmit, clearErrors, formState: { errors, isValid, isSubmitting } } = useForm({
        resolver: zodResolver(LoginSchema),
        mode: "onChange"
    });
    const handleLogin = async (data: LoginSchemaType) => {
        clearErrors("root")
        console.log(data);
        try {
            const { error } = await login(data);
            if (error) {
                toast.add({
                    type: "error",
                    description: error
                });
                return
            }
            toast.add({
                type: "success",
                description: "you logged int."
            })
            const user = useAuthStore.getState().user
            console.log(user);

            if (user) navigate(HOME[user.role], { replace: true })
        } catch (error) {
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
                    <CardTitle className="text-xl">Welcome back</CardTitle>
                    <CardDescription>
                        Login with your Email and Password
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <FieldGroup>


                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    {...register("email")}
                                    id="email"
                                    type="text"
                                    placeholder="jhon@gmail.com"
                                    required
                                />
                                {errors.email && <FieldDescription className="text-destructive">
                                    {errors.email.message}
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
                                        Logging in
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

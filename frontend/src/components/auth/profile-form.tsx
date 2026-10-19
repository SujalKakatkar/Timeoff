import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ProfilePayload, ProfileSchema, type ProfileSchemaType } from '@/schemas/profile-schema'
import { Textarea } from '../ui/textarea'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Spinner } from '../ui/spinner'
import { toast } from '../ui/toast'
import { useDepartment } from '@/hooks/use-departments'
import { useAuthStore } from '@/store/UseAuthStore'
import { useNavigate } from 'react-router'
import { HOME } from '@/constants/routes'

function ProfileForm(): React.JSX.Element {
    const navigate = useNavigate()
    const { departments, loading, error } = useDepartment();
    const updateProfile = useAuthStore((s) => s.updateProfile)
    const { register, handleSubmit, formState: { errors, isSubmitting, isValid }, control } = useForm(
        {
            resolver: zodResolver(ProfileSchema),
            mode: "onTouched",

        }
    );

    const profileSubmit = async (values: ProfileSchemaType) => {
        const { error } = await updateProfile(ProfilePayload.parse(values));

        if (error) {
            toast.add({ type: "error", description: error });
            return;
        }

        toast.add({ type: "success", description: "Profile completed" });

        const user = useAuthStore.getState().user;
        if (user) navigate(HOME[user.role], { replace: true });
    };

    return (
        <Card >
            <CardHeader>
                <CardTitle>Profile Details</CardTitle>
                <CardDescription>
                    Enter your information below
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(profileSubmit)}>
                    <FieldGroup>

                        <Field>
                            <FieldLabel htmlFor="phone">Phone</FieldLabel>
                            <Input
                                {...register("phone")}
                                id="phone"
                                type="text"
                                maxLength={10}
                                placeholder="+91 9036060606"
                                required
                            />
                            {errors.phone && <FieldDescription className='text-destructive'>
                                {errors.phone.message}
                            </FieldDescription>}
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="address">Address</FieldLabel>
                            <Textarea {...register("address")} id="address" placeholder='#401, 5th street, Mumbai' required />
                            {errors.address && <FieldDescription className='text-destructive'>
                                {errors.address.message}
                            </FieldDescription>}
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="department">
                                Department
                            </FieldLabel>
                            <Controller
                                name='departmentId'
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={(v) => field.onChange(v ?? "")} value={field.value || null} items={departments.map((d) => ({
                                        value: String(d.deptId),
                                        label: d.name
                                    }))} >
                                        <SelectTrigger className="w-45">
                                            <SelectValue placeholder={loading ? "Loading..." : "Select department"} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {departments.map((item) => (
                                                    <SelectItem key={item.deptId} value={String(item.deptId)}>
                                                        {item.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.departmentId && <FieldDescription className='text-destructive'>
                                {errors.departmentId?.message}
                            </FieldDescription>}
                            {error && <FieldDescription className='text-destructive'>
                                Could not load the departments
                            </FieldDescription>}
                        </Field>
                        <FieldGroup>
                            <Field>
                                <Button disabled={!isValid || isSubmitting} type="submit">
                                    {isSubmitting ? <>
                                        <Spinner />
                                        Updating the data
                                    </> : "Update data"}
                                </Button>
                            </Field>
                        </FieldGroup>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}

export default ProfileForm
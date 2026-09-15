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
import { depts, ProfileSchema, type ProfileSchemaType } from '@/schemas/profile-schema'
import { Textarea } from '../ui/textarea'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Spinner } from '../ui/spinner'
import { toast } from '../ui/toast'

function ProfileForm():React.JSX.Element {

    const {register, handleSubmit, formState:{errors,isSubmitting, isValid}, control} = useForm(
        {
            resolver:zodResolver(ProfileSchema),
            mode:"onTouched",
            
        }
    );

    const profileSubmit= async (profileData:ProfileSchemaType) => {
        console.log(profileData);
        try {
            //todo:backend api call
        } catch (error) {
            toast.add({
                type:"error",
                description:"somthing went wrong"
            })
        }
    }

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
                          <FieldLabel htmlFor="name">Full Name</FieldLabel>
                          <Input {...register("fullName")}  id="name" type="text" placeholder="John Doe" required />
                          {errors.fullName && <FieldDescription className='text-destructive'>
                            {errors.fullName.message}
                            </FieldDescription>}
                      </Field>
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
                        {/* //todo:  make this department as select menu and store all the depts inside the table */}
                          <FieldLabel htmlFor="department">
                              Department
                          </FieldLabel>
                        <Controller
                        name='department'
                        control={control}
                        render={({field})=>(
                            <Select onValueChange={field.onChange} value={field.value} >
                                <SelectTrigger className="w-45">
                                    <SelectValue placeholder="Department" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {depts.options.map((item) => (
                                            <SelectItem key={item} value={item}>
                                                {item}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                        />
                          {errors.department && <FieldDescription className='text-destructive'>
                              {errors.department?.message}
                          </FieldDescription>}
                      </Field>
                      <FieldGroup>
                          <Field>
                              <Button disabled={!isValid || isSubmitting} type="submit">
                                {isSubmitting? <>
                                <Spinner/>
                                Updating the data
                                </>: "Update data"}
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
import { Button, TextInput, Text } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { Form, FormAnnotation } from "./styles";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'

const claimUsernameFormSchema = z.object({
  username: z.string()
    .min(3, { message: 'O nome precisa ter no mínimo 3 caracteres.' })
    .regex(/^([a-z\\-]+)$/i, { message: 'O nome pode conter apenas letras e hífens.' })
    .transform(username => username[0].toUpperCase().slice(-1) + username.toLowerCase().slice(1)),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema)
  })

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    console.log(data)
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          size="sm"
          prefix="ignite.com/"
          placeholder="seu-usuário"
          {...register('username')}
        />
        <Button size="sm" type="submit">
          Reservar
          <ArrowRight />
        </Button>
      </Form>

      <FormAnnotation>
        <Text size="sm">
          {errors.username ? errors.username.message : 'Digite o nome de usuário desejado.'}
        </Text>
      </FormAnnotation>
    </>
  )
}
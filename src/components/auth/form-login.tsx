'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { formEmailValidation } from '@/lib/validation'

import { magic } from '@/lib/magic'
import { RPCError, RPCErrorCode } from 'magic-sdk'

export function FormLogin() {
  const form = useForm<z.infer<typeof formEmailValidation>>({
    resolver: zodResolver(formEmailValidation),
    defaultValues: {
      email: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formEmailValidation>) {
    try {
      const didToken = await magic.auth.loginWithEmailOTP({
        email: values.email,
        showUI: false,
      })

      console.log('ini nilai: ', didToken)
    } catch (err) {
      if (err instanceof RPCError) {
        switch (err.code) {
          case RPCErrorCode.MagicLinkFailedVerification:
          case RPCErrorCode.MagicLinkExpired:
          case RPCErrorCode.MagicLinkRateLimited:
          case RPCErrorCode.UserAlreadyLoggedIn:
            console.log('Specific Magic error occurred:', err.code)
            break
        }
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel className="ps-2 md:text-base">Username</FormLabel>
              <FormControl>
                <Input
                  className="mt-1 pt-5 pb-6 md:ps-4 md:pt-6 md:pb-7 md:text-base"
                  placeholder="Enter email.."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="cursor-pointer px-6 py-5 md:px-10 md:py-6 md:text-base"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  )
}

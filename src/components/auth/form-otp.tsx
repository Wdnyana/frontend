import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  LoginWithEmailOTPEventEmit,
  LoginWithEmailOTPEventOnReceived,
} from 'magic-sdk'

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'

import { OTPTypes } from '@/types/general-type'
import { Button } from '../ui/button'
import Loading from '../ui/loading'

export function FormOTP({ loginOtp, cancelOTP }: OTPTypes) {
  const [otpCode, setOtpCode] = useState('')
  const [retries, setRetries] = useState(2)
  const [disable, setDisable] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string>()

  const navigate = useNavigate()

  const handleChange = (value: string) => {
    setOtpCode(value)
  }

  async function handleOTPCode(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setLoading(true)
    setDisable(true)
    setRetries((r) => r - 1)

    loginOtp?.emit(LoginWithEmailOTPEventEmit.VerifyEmailOtp as any, otpCode)

    loginOtp?.on(
      LoginWithEmailOTPEventOnReceived.InvalidEmailOtp as any,
      () => {
        setDisable(false)

        if (!retries) {
          setMessage('Please try again later.')
          cancelOTP()
        } else {
          setMessage(
            `Incorrect OTP, please enter OTP again. ${retries - 1} ${retries === 1 ? 'retry' : 'retries'} left.`,
          )
        }
      },
    )

    window.dispatchEvent(new Event('storage'))
    navigate('/dashboard', { replace: true })

    setLoading(false)
  }

  return (
    <form onSubmit={handleOTPCode}>
      {message && <code>{message}</code>}

      <InputOTP
        className="mt-3"
        maxLength={6}
        value={otpCode}
        onChange={handleChange}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>

      <Button
        type="submit"
        className="mt-5 cursor-pointer px-6 py-4 md:px-8 md:py-5 md:text-base"
        disabled={loading || disable || otpCode.length < 6}
      >
        {loading ? <Loading className="h-5 w-5" /> : 'Submit'}
      </Button>
    </form>
  )
}

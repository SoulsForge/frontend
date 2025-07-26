import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  ResetPasswordDto,
  resetPasswordSchema
} from '@/services/users/dto/reset-password.dto';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from '@tanstack/react-router';
import { SubmitButton } from '@/components/ui-custom/submit-button';
import { createFileRoute } from '@tanstack/react-router';
import { resetPassword } from '@/services/users';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

export const Route = createFileRoute('/(auth)/reset-password')({
  component: RouteComponent
});

function RouteComponent() {
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const form = useForm<ResetPasswordDto>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: ''
    }
  });

  async function handleOnSubmit(data: ResetPasswordDto) {
    setLoading(true);
    form.clearErrors();

    try {
      await resetPassword(data);
      setSubmittedEmail(data.email);
      setIsSubmitted(true);
    } catch (error: unknown) {
      let errorMessage = 'An unexpected error occurred';

      if (error && typeof error === 'object' && 'response' in error) {
        const apiError = error as {
          response?: { errors?: Array<{ message: string }> };
        };
        if (apiError.response?.errors?.[0]?.message) {
          errorMessage = apiError.response.errors[0].message;
        }
      } else if (error instanceof Error && error.message) {
        errorMessage = error.message;
      }

      form.setError('root', {
        type: 'manual',
        message: errorMessage
      });
    } finally {
      setLoading(false);
    }
  }

  if (isSubmitted) {
    return (
      <section className='mx-auto mt-auto mb-auto w-full max-w-lg'>
        <Card>
          <CardHeader>
            <CardTitle className='text-2xl'>Check Your Email</CardTitle>
            <CardDescription className='flex flex-col gap-2'>
              <p>
                If an account with email <strong>{submittedEmail}</strong>{' '}
                exists, we've sent you a new password and verification code.
              </p>
              <p>
                Please check your email (including spam folder) and use the new
                password to log in. You'll need to verify your email again for
                security.
              </p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col gap-2'>
              <Button asChild className='w-full'>
                <Link to='/login'>Back to Login</Link>
              </Button>
              <Button variant='outline' asChild className='w-full'>
                <Link
                  to='/reset-password'
                  onClick={() => setIsSubmitted(false)}
                >
                  Send Another Reset
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className='mx-auto mt-auto mb-auto w-full max-w-lg'>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Reset Password</CardTitle>
          <CardDescription className='flex flex-col gap-2'>
            <p>
              Enter your email address and we will send you a new password and
              verification code.
            </p>
            <p>
              For security reasons, you'll need to verify your email again after
              using the new password.
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-2'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleOnSubmit)}
              className='space-y-4'
            >
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder='Enter your email address'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.formState.errors.root && (
                <div className='font-medium text-destructive text-sm'>
                  {form.formState.errors.root.message}
                </div>
              )}

              <SubmitButton
                type='submit'
                className='w-full'
                isSubmitting={loading}
                submittingText='Sending...'
              >
                Send Reset Email
              </SubmitButton>
            </form>
          </Form>

          <div className='mt-4 text-center text-sm'>
            Remember your password?{' '}
            <Button variant='link' className='p-1' asChild>
              <Link to='/login'>
                <span className='underline underline-offset-4'>
                  Back to Login
                </span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

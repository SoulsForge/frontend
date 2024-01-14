import { Button, Card, CardBody, CardHeader, Divider, Input } from '@nextui-org/react';
import useFormState from '@/lib/hooks/useFormState';
import { useEffect, useState } from 'react';
import { Eye, EyeOffIcon } from 'lucide-react';
import MainLayout from '@/lib/components/layout/main-layout';
import useAuth from '@/lib/hooks/useAuth';
import { authLogin } from '@/services/auth-service';
import { useRouter } from 'next/router';
import { useParams, useSearchParams } from 'next/navigation';
import { wait } from 'next/dist/lib/wait';


interface ILoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const handleFormSubmit = async () => {
    await wait(1000);

    try {
      const data = await authLogin(formState);
      login(data);
      const returnUrl = searchParams.getAll('return_url')[0];
      if (Boolean(returnUrl))
        await router.push(returnUrl);
      else
        await router.push('/settings');
    } catch (e: any) {
      console.log('login error: ', e.message);
    }
  };

  const {
    formState,
    handleChange,
    handleChangeManually,
    submitForm,
    isLoading
  } = useFormState<ILoginForm>({ initialState: { email: '', password: '' }, onSubmit: handleFormSubmit });
  const { login, isLogged } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const toggleVisibility = () => setIsPasswordVisible(!isPasswordVisible);


  // useEffect(() => {
  //   if (isLogged()) {
  //     router.push('/settings');
  //   }
  // }, [isLogged]);

  return (
    <article className='flex-grow grid place-content-center'>
      <Card className='max-w-[500px] min-w-[200px]'>
        <CardHeader>
          <h2>Login</h2>
        </CardHeader>
        <Divider/>
        <CardBody>
          <form
            className='flex flex-col gap-2'
            onSubmit={submitForm}>
            <Input
              isClearable
              type='email'
              label='Email'
              name='email'
              variant='bordered'
              placeholder='Enter your email'
              value={formState.email}
              onChange={handleChange}
              onClear={() => handleChangeManually('email', '')}
              className='max-w-xs'
              disabled={isLoading}
            />
            <Input
              isClearable
              startContent={
                <button
                  className='focus:outline-none'
                  type='button'
                  onClick={toggleVisibility}
                >
                  {isPasswordVisible ? (
                    <Eye size='20'/>
                  ) : (
                    <EyeOffIcon size='20'/>
                  )}
                </button>
              }
              type={isPasswordVisible ? 'text' : 'password'}
              label='Password'
              variant='bordered'
              name='password'
              placeholder='Enter your password'
              value={formState.password}
              onChange={handleChange}
              onClear={() => handleChangeManually('password', '')}
              className='max-w-xs'
              disabled={isLoading}
            />
            <Divider/>
            <Button type='submit' isLoading={isLoading}>
              Login
            </Button>
          </form>
        </CardBody>
      </Card>
    </article>
  );
}
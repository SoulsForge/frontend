import { Button, Card, CardBody, CardHeader, Divider, Input } from '@nextui-org/react';
import useFormState from '@/lib/hooks/useFormState';
import { useState } from 'react';
import { Eye, EyeOffIcon } from 'lucide-react';
import MainLayout from '@/lib/components/layout/main-layout';
import { authLogin, authRegister } from '@/services/auth-service';


interface IRegisterForm {
  email: string;
  username: string;
  password: string;
}

export default function LoginPage({ searchParams }: { searchParams: { return_url: string | undefined } }) {
  const handleFormSubmit = async () => {
    try {
      const data = await authRegister(formState);
      console.log(data);
    } catch (e: any) {
      console.log('register error: ', e.message);
    }
  };

  const { formState, handleChange, handleChangeManually, submitForm, isLoading } =
    useFormState<IRegisterForm>({
      initialState: {
        email: '',
        password: '',
        username: ''
      },
      onSubmit: handleFormSubmit
    });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const toggleVisibility = () => setIsPasswordVisible(!isPasswordVisible);


  return (
    <article className='flex-grow grid place-content-center'>
      <Card className='max-w-[500px] min-w-[200px]'>
        <CardHeader>
          <h2>Register</h2>
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
              type='text'
              label='Username'
              name='username'
              variant='bordered'
              placeholder='Enter your username'
              value={formState.username}
              onChange={handleChange}
              onClear={() => handleChangeManually('username', '')}
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
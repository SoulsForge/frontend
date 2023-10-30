'use client';

import { Button, Divider, Input } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import useAuth from '~/hooks/useAuth';
import useFormState from '~/hooks/useFormState';
import ISessionAndUser from '~/lib/interfaces/auth/session-and-user.interface';

interface LoginFormInterface {
  email: string;
  password: string;
}

export default function LoginBody() {
  const { formState, handleChange, handleChangeManually, resetForm } =
    useFormState<LoginFormInterface>({
      email: '',
      password: ''
    });
  const { login, isLogged } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isLogged()) {
      router.push('/profile');
    }
  }, [isLogged, router]);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    fetch(`http://localhost:6661/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formState)
    })
      .then((res) => res.json())
      .then((data: ISessionAndUser) => {
        login(data);
      })
      .catch(console.log)
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form className='flex flex-col gap-2' onSubmit={handleFormSubmit}>
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
        disabled={loading}
      />
      <Input
        isClearable
        startContent={
          <button
            className='focus:outline-none'
            type='button'
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <AiFillEyeInvisible className='text-2xl text-default-400 pointer-events-none' />
            ) : (
              <AiFillEye className='text-2xl text-default-400 pointer-events-none' />
            )}
          </button>
        }
        type={isVisible ? 'text' : 'password'}
        label='Password'
        variant='bordered'
        name='password'
        placeholder='Enter your password'
        value={formState.password}
        onChange={handleChange}
        onClear={() => handleChangeManually('password', '')}
        className='max-w-xs'
        disabled={loading}
      />
      <Divider />
      <Button type='submit' isLoading={loading}>
        Login
      </Button>
    </form>
  );
}

'use client';

import { Button, Divider, Input } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import useAuth from '~/hooks/useAuth';
import useFormState from '~/hooks/useFormState';
import { ErrorResponse } from '~/lib/interfaces/auth/error-response.interface';
import ISessionAndUser from '~/lib/interfaces/auth/session-and-user.interface';

interface RegisterFormInterface {
  email: string;
  username: string;
  password: string;
}

export default function RegisterBody() {
  const { formState, handleChange, handleChangeManually, resetForm } =
    useFormState<RegisterFormInterface>({
      email: '',
      password: '',
      username: ''
    });
  const { login, isLogged } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState([]);

  useEffect(() => {
    if (isLogged()) {
      router.push('/profile');
    }
  }, [isLogged, router]);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    fetch(`http://localhost:6661/api/v1/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formState)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          const message = data.message[0];
          throw new Error(message.charAt(0).toUpperCase() + message.slice(1));
        }

        fetch(`http://localhost:6661/api/v1/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: formState.email,
            password: formState.password
          })
        })
          .then((res) => res.json())
          .then((data: ISessionAndUser) => {
            login(data);
          })
          .catch(console.log);
      })
      .catch((e) => {
        setError(e.message);
      })
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
        type='text'
        label='Username'
        name='username'
        variant='bordered'
        placeholder='Enter your username'
        value={formState.username}
        onChange={handleChange}
        onClear={() => handleChangeManually('username', '')}
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
      <p className='text-sm text-red-500'>{error}</p>
      <Divider />
      <Button type='submit' isLoading={loading}>
        Register
      </Button>
    </form>
  );
}

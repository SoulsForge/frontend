import client from '@/services/fetch-client';
import { BACKEND_BASE_URL } from '@/config/env-vars';
import ISession from '@/lib/interfaces/user/session.interface';

export async function authLogin(data: any): Promise<ISession> {
  const response = await client(`${BACKEND_BASE_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });


  return await response.json();
}

export async function authRegister(data: any): Promise<any> {
  const response = await client(`${BACKEND_BASE_URL}/auth/register`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    }
  });

  return await response.json();
}

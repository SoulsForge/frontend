import client from '@/services/fetch-client';
import { BACKEND_BASE_URL } from '@/config/env-vars';

export async function getCurrentUser(): Promise<any> {
  const response = await client(`${BACKEND_BASE_URL}/auth/verify`, {
    method: 'POST'
  });

  return await response.json();
}
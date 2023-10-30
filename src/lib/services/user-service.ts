import IUser from '../interfaces/auth/user.interface';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL + '/auth';

// export async function getCurrentUser(token: string): Promise<IUser> {
export async function getCurrentUser(token: string) {
  return new Promise(async (resolve, reject) => {
    const res = await fetch(`${BASE_URL}/verify`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data: IUser = await res.json();

    if (!res.ok) {
      reject(data);
    }

    resolve(data as IUser);
  });
}

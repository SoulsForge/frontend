interface IDictionary {
  [id: string]: any;
}

interface FetchOptions {
  method: string;
  headers?: Record<string, string>;
  body?: BodyInit | null;
}

const headers: IDictionary = {};

async function client(url: string, options?: FetchOptions): Promise<any> {

  const h = { ...options?.headers, ...headers };

  try {
    const response = await fetch(url, {
      method: options?.method,
      headers: h,
      body: options?.body,
    });

    // if (!response.ok) {
    //   throw new Error(`HTTP error! Status: ${response.status}`);
    // }

    return response;
  } catch (error: any) {
    throw new Error(`Fetch error: ${error.message}`);
  }
}

export function setBearerToken(token: string) {
  headers['Authorization'] = `Bearer ${token}`;
}

export function removeBearerToken() {
  delete headers['Authorization'];
}


export default client;
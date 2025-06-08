export async function fetchData<T>(
  url: string,
  method: 'GET' | 'POST' | 'DELETE' = 'GET',
  body: T | null = null
): Promise<T | null> {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}

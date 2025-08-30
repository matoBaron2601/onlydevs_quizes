const login = async () => {
  const response = await fetch('http://localhost:5173/api/login', {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response;
};
export default login;

const post = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  console.log({ username, password });
  const response = await fetch('/api/v1/sessions', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) throw new Error('Invalid credentials');
};

const del = async () => {
  const response = await fetch('/api/v1/sessions', {
    method: 'DELETE',
  });

  if (!response.ok) throw new Error('Error logging out');
};

export default {
  post,
  del,
};

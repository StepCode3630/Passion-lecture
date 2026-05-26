export async function register(fullName, email, password) {
  const api_url = `http://localhost:3333/user/register`

  const response = await fetch(api_url, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({ fullName, email, password }),
  })

  return await response.json()
}

export async function login(email, password) {
  const api_url = `http://localhost:3333/user/login`

  const response = await fetch(api_url, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({ email, password }),
  })

  return await response.json()
}

export async function logout() {
  const api_url = `http://localhost:3333/user/logout`
  const token = localStorage.getItem('token')

  await fetch(api_url, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}
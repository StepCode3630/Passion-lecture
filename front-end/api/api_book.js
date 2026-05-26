export async function getAllBooks(params = {}) {
  const query = new URLSearchParams(params).toString()
  const api_url = query
    ? `http://localhost:3333/books?${query}`
    : `http://localhost:3333/books`

  const response = await fetch(api_url)
  const data = await response.json()

  return data.data ?? data
}

export async function getBookById(id) {
  const api_url = `http://localhost:3333/books/${id}`

  const response = await fetch(api_url)

  return await response.json()
}

export async function createAuthor(firstName, lastName) {
  const api_url = `http://localhost:3333/authors`
  const token = localStorage.getItem('token')

  const response = await fetch(api_url, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({ firstName, lastName }),
  })

  return await response.json()
}

export async function createBook(bookData) {
  const api_url = `http://localhost:3333/books`
  const token = localStorage.getItem('token')

  const response = await fetch(api_url, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(bookData),
  })

  return await response.json()
}

export async function updateBook(id, bookData) {
  const api_url = `http://localhost:3333/books/${id}`
  const token = localStorage.getItem('token')

  const response = await fetch(api_url, {
    method: 'PUT',

    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(bookData),
  })

  return await response.json()
}

export async function deleteBook(id) {
  const api_url = `http://localhost:3333/books/${id}`
  const token = localStorage.getItem('token')

  await fetch(api_url, {
    method: 'DELETE',

    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function getAllCategories() {
  const api_url = `http://localhost:3333/categories`

  const response = await fetch(api_url)
  const data = await response.json()

  return data.data ?? data
}
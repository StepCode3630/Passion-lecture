export async function getComments(bookId) {
  const api_url = `http://localhost:3333/books/${bookId}/comments`

  const response = await fetch(api_url)
  const data = await response.json()

  return data.data ?? data
}

export async function addComment(bookId, comment) {
  const api_url = `http://localhost:3333/books/${bookId}/comments`
  const token = localStorage.getItem('token')

  const response = await fetch(api_url, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(comment),
  })

  return await response.json()
}
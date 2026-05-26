export async function addComment(bookId, comment) {
  const api_url = `http://localhost:3333/books/${bookId}/comments`

  const response = await fetch(api_url, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(comment),
  })

  return await response.json()
}

export async function getComments(bookId) {
  const api_url = `http://localhost:3333/books/${bookId}/comments`
  const response = await fetch(api_url)

  return await response.json()
}

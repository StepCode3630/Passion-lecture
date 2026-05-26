const api_url = 'http://localhost:3333/books'

export async function getAllBooks() {
  try {
    const response = await fetch(api_url)

    const data = await response.json()

    console.log(data)

    return data
  } catch (error) {
    console.error(error)
  }
}

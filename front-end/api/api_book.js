export async function getAllBooks() {
  try {
    const api_url = 'http://localhost:3333/books'

    const response = await fetch(api_url)

    const data = await response.json()

    console.log(data)

    return data
  } catch (error) {
    console.error(error)
  }
}

export async function getBookById(id) {
  try {
    const api_url = `http://localhost:3333/books/${id}`

    const response = await fetch(api_url)

    const data = await response.json()

    console.log(data)

    return data
  } catch (error) {
    console.error(error)
  }
}

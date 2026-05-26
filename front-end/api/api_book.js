const api_url = 'http://127.0.0.1:3333/books'



async function getAllBooks() {
  const getBooks = fetch(api_url)
  return getBooks.then((response) => response.json()).then((data) =>{ console.log(data)})
}
getAllBooks()

export const fetchBooks = async () => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/books`);
  if (!response.ok) {
    console.error("Error response: ", response);
    throw new Error("Failed to fetch books");
  }
  return response.json();
};

export const fetchBook = async (bookId) => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/books/${bookId}`
  );
  if (!response.ok) {
    console.error("Error response: ", response);
    throw new Error(`Failed to fetch book: #${bookId}`);
  }
  return response.json();
};

export const createBook = async (book) => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/books`, {
    method: "POST",
    body: JSON.stringify(book),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    console.error("Error response from createBook(): ", errorResponse);
    throw new Error("Failed to create book");
  }

  return response.json();
};

export const deleteBook = async (bookId) => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/books/${bookId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    const errorResponse = await response.json();
    console.error("Error response from deleteBook(): ", errorResponse);
    throw new Error("Failed to delete book");
  }
};

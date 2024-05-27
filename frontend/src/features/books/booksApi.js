export const fetchBooks = async () => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/books`);
  if (!response.ok) {
    console.error("Error response: ", response);
    throw new Error("Failed to fetch books");
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
    console.error("Error response from createBook(): ", response);
    throw new Error("Failed to create book");
  }
  return response.json();
};

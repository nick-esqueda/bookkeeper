export const fetchBooks = async () => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/books`);
  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }
  return response.json();
};

export const fetchBookCategories = async () => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/book-categories`);
  if (!response.ok) {
    throw new Error('Failed to fetch bookCategories');
  }
  return response.json();
};

export const fetchBookTags = async () => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/book-tags`);

  if (!response.ok) {
    console.error("Error response: ", response);
    throw new Error("Failed to fetch book tags");
  }
  return response.json();
};

export const fetchBookTag = async (bookTagId) => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/book-tags/${bookTagId}`
  );
  if (!response.ok) {
    console.error("Error response: ", response);
    throw new Error(`Failed to fetch book tag: #${bookTagId}`);
  }
  return response.json();
};

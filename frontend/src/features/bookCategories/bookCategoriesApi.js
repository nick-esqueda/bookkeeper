export const fetchBookCategories = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/book-categories`
  );
  if (!response.ok) {
    const errorResponse = await response.json();
    console.error("Error response from fetchBookCategories(): ", errorResponse);
    throw new Error("Failed to fetch bookCategories");
  }
  return response.json();
};

export const fetchBookCategory = async (bookCategoryId) => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/book-categories/${bookCategoryId}`
  );
  if (!response.ok) {
    const errorResponse = await response.json();
    console.error("Error response from fetchBookCategory(): ", errorResponse);
    throw new Error(`Failed to fetch bookCategory: #${bookCategoryId}`);
  }
  return response.json();
};

export const createBookCategory = async (bookCategory) => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/book-categories`,
    {
      method: "POST",
      body: JSON.stringify(bookCategory),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorResponse = await response.json();
    console.error("Error response from createBookCategory(): ", errorResponse);
    throw new Error("Failed to create category");
  }
  return response.json();
};
